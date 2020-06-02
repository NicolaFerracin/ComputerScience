--[[
    ScoreState Class
    Author: Colton Ogden
    cogden@cs50.harvard.edu

    A simple state used to display the player's score before they
    transition back into the play state. Transitioned to from the
    PlayState when they collide with a Pipe.
]]

ScoreState = Class{__includes = BaseState}

local ONE_STAR_MIN_SCORE = 1
local TWO_STARS_MIN_SCORE = 4
local THREE_STARS_MIN_SCORE = 10

--[[
    When we enter the score state, we expect to receive the score
    from the play state so we know what to render to the State.
]]
function ScoreState:enter(params)
    self.score = params.score
    self.star = love.graphics.newImage('star.png')
end

function ScoreState:update(dt)
    -- go back to play if enter is pressed
    if love.keyboard.wasPressed('enter') or love.keyboard.wasPressed('return') then
        gStateMachine:change('countdown')
    end
end

function ScoreState:render()
    -- simply render the score to the middle of the screen
    love.graphics.setFont(flappyFont)
    love.graphics.printf('Oof! You lost!', 0, 64, VIRTUAL_WIDTH, 'center')
    
    love.graphics.setFont(mediumFont)
    love.graphics.printf('Score: ' .. tostring(self.score), 0, 100, VIRTUAL_WIDTH, 'center')
    
    love.graphics.printf('Press Enter to Play Again!', 0, 200, VIRTUAL_WIDTH, 'center')
    
    -- Assignment1: render stars based on score
    starsWidth = self.star:getWidth()
    if (self.score >= THREE_STARS_MIN_SCORE) then 
      starsWidth = self.star:getWidth() * 3 + 60
    elseif (self.score >= TWO_STARS_MIN_SCORE) then
      starsWidth = self.star:getWidth() * 2 + 30
    end

    if self.score >= THREE_STARS_MIN_SCORE then
      love.graphics.draw(self.star, VIRTUAL_WIDTH / 2 - starsWidth / 2, 130)
      love.graphics.draw(self.star, VIRTUAL_WIDTH / 2 - self.star:getWidth() / 2, 130)
      love.graphics.draw(self.star, VIRTUAL_WIDTH / 2 + starsWidth / 2 - self.star:getWidth(), 130)
    elseif self.score >= TWO_STARS_MIN_SCORE then 
      love.graphics.draw(self.star, VIRTUAL_WIDTH / 2 - starsWidth / 2, 130)
      love.graphics.draw(self.star, VIRTUAL_WIDTH / 2 + starsWidth / 2 - self.star:getWidth(), 130)
    elseif self.score >= ONE_STAR_MIN_SCORE then
      love.graphics.draw(self.star, VIRTUAL_WIDTH / 2 - self.star:getWidth() / 2, 130)
    end
end
