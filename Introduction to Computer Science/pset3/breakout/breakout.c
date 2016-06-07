//
// breakout.c
//
// Computer Science 50
// Problem Set 3
//

// standard libraries
#define _XOPEN_SOURCE
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>

// Stanford Portable Library
#include <spl/gevents.h>
#include <spl/gobjects.h>
#include <spl/gwindow.h>

// height and width of game's window in pixels
#define HEIGHT 500
#define WIDTH 401

// number of rows of bricks
#define ROWS 7

// number of columns of bricks
#define COLS 10

// brick width and height
#define BRICK_HEIGHT 10
#define BRICK_WIDTH 38

// radius of ball in pixels
#define RADIUS 10

// lives
#define LIVES 3

// paddle height and width
#define PADDLE_HEIGHT 10
#define PADDLE_WIDTH 50

// prototypes
void initBricks(GWindow window);
GOval initBall(GWindow window);
GRect initPaddle(GWindow window);
GLabel initScoreboard(GWindow window);
void updateScoreboard(GWindow window, GLabel label, int points, int bricks);
GObject detectCollision(GWindow window, GOval ball);

int main(void)
{
    // seed pseudorandom number generator
    srand48(time(NULL));

    // instantiate window
    GWindow window = newGWindow(WIDTH, HEIGHT);

    // instantiate bricks
    initBricks(window);

    // instantiate ball, centered in middle of window
    GOval ball = initBall(window);

    // instantiate paddle, centered at bottom of window
    GRect paddle = initPaddle(window);

    // instantiate scoreboard, centered in middle of window, just above ball
    GLabel label = initScoreboard(window);

    // number of bricks initially
    int bricks = COLS * ROWS;

    bool moveBall = false;
    
    // number of lives initially
    int lives = LIVES;

    // number of points initially
    int points = 0;

    double velocityY = 3.0;
    double velocityX = drand48();
    
    // keep playing until game over
    while (lives > 0 && bricks > 0)
    {
        if(moveBall)
        {
            // move circle along x-axis
            move(ball, velocityX, velocityY);
            
            if(getY(ball) + RADIUS >= HEIGHT)
            {
                lives--;
                updateScoreboard(window, label, lives, bricks);
                if(lives > 0)
                {
                    waitForClick();
                    setLocation(ball, WIDTH / 2 - RADIUS / 2, HEIGHT / 2 - RADIUS / 2);
                }
            }
            else if (getY(ball) <= 0)
            {
                velocityY = -velocityY;
            }
            else if(getX(ball) <= 0 || getX(ball) + RADIUS >= WIDTH)
            {
                velocityX = -velocityX;
            }
            else
            {
            // detect collision
            GObject object = detectCollision(window, ball);

                // bounce off bottom edge of window
                if (object != NULL)
                {
                    if (object == paddle)
                    {
                        velocityY = -velocityY;
                    }   
                    else if (strcmp(getType(object), "GRect") == 0)
                    {
                       removeGWindow(window, object);
                       velocityY = -velocityY;
                       bricks--;
                       if(bricks == 0)
                       {
                           updateScoreboard(window, label, lives, bricks);
                       }
                        
                    }
                }
                
            // linger before moving again
            pause(10);
           }
        }
        GEvent event = getNextEvent(MOUSE_EVENT);
        if(event != NULL)
        {
            if(getEventType(event) == MOUSE_CLICKED)
            {
               moveBall = true;
            }
            if(getEventType(event) == MOUSE_MOVED)
                {
                    double x = getX(event) - PADDLE_WIDTH / 2;
                    double y = HEIGHT - PADDLE_HEIGHT - 50;
                    setLocation(paddle, x, y);
                }
        }
    }
    

    // wait for click before exiting
    waitForClick();

    // game over
    closeGWindow(window);
    return 0;
}

/**
 * Initializes window with a grid of bricks.
 */
void initBricks(GWindow window)
{
    char* color[] = {"RED", "ORANGE", "YELLOW", "GREEN", "BLUE", "CYAN", "MAGENTA"};
    int spaceX = 1;
    int spaceY = 2;
    for(int i = 0; i < ROWS; i++)
    {
        for(int j = 0; j < COLS; j++)
        {
            GRect brick = newGRect(spaceX + BRICK_WIDTH * j, spaceY, BRICK_WIDTH, BRICK_HEIGHT);
            setFilled(brick, true);
            setColor(brick, color[i]);
            add(window, brick);
            spaceX += 2;
        }
        spaceY += 2 + BRICK_HEIGHT;
        spaceX = 1;
    }
}

/**
 * Instantiates ball in center of window.  Returns ball.
 */
GOval initBall(GWindow window)
{
    int x = WIDTH / 2 - RADIUS / 2;
    int y = HEIGHT / 2 - RADIUS / 2;
    GOval ball = newGOval(x - 30, y, RADIUS, RADIUS);
    setFilled(ball, true);
    setColor(ball, "BLACK");
    add(window, ball);
    return ball;
}

/**
 * Instantiates paddle in bottom-middle of window.
 */
GRect initPaddle(GWindow window)
{
    int y = HEIGHT - PADDLE_HEIGHT - 50;
    int x = WIDTH / 2 - PADDLE_WIDTH / 2;
    GRect paddle = newGRect(x, y, PADDLE_WIDTH, PADDLE_HEIGHT);
    setFilled(paddle, true);
    setColor(paddle, "BLACK");
    add(window, paddle);
    return paddle;
}

/**
 * Instantiates, configures, and returns label for scoreboard.
 */
GLabel initScoreboard(GWindow window)
{
    char s[12];
    sprintf(s, "%i", LIVES);
    GLabel score = newGLabel(s);
    setFont(score, "SansSerif-50");
    double x = (WIDTH - getWidth(score)) / 2;
    double y = (HEIGHT + getFontAscent(score)) / 2;
    setLocation(score, x, y);
    setColor(score, "GREY");
    add(window, score);
      
      
    return score;
}

/**
 * Updates scoreboard's label, keeping it centered in window.
 */
void updateScoreboard(GWindow window, GLabel label, int points, int bricks)
{
    // update label
    if(points <= 0)
    {
        char s[9] =  "GAME OVER";
        setLabel(label, s);
    }
    else if(bricks <= 0)
    {
        char s[7] =  "aaaaaaa";
        setLabel(label, s);
    }
    else
    {
        char s[12];
        sprintf(s, "%i", points);
        setLabel(label, s);
    }
    double x = (WIDTH - getWidth(label)) / 2;
    double y = (HEIGHT + getFontAscent(label)) / 2;
    setLocation(label, x, y);
}

/**
 * Detects whether ball has collided with some object in window
 * by checking the four corners of its bounding box (which are
 * outside the ball's GOval, and so the ball can't collide with
 * itself).  Returns object if so, else NULL.
 */
GObject detectCollision(GWindow window, GOval ball)
{
    // ball's location
    double x = getX(ball);
    double y = getY(ball);

    // for checking for collisions
    GObject object;

    // check for collision at ball's top-left corner
    object = getGObjectAt(window, x, y);
    if (object != NULL)
    {
        return object;
    }

    // check for collision at ball's top-right corner
    object = getGObjectAt(window, x + 2 * RADIUS, y);
    if (object != NULL)
    {
        return object;
    }

    // check for collision at ball's bottom-left corner
    object = getGObjectAt(window, x, y + 2 * RADIUS);
    if (object != NULL)
    {
        return object;
    }

    // check for collision at ball's bottom-right corner
    object = getGObjectAt(window, x + 2 * RADIUS, y + 2 * RADIUS);
    if (object != NULL)
    {
        return object;
    }

    // no collision
    return NULL;
}
