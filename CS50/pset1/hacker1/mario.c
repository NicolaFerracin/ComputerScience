/**
* OSS
* Introduction to Computer Science
* Problem Set 1 - Hacker Edition
* Itsa Mario
*/

#include <stdio.h>
#include <cs50.h>

int main(void)
{
    int height = -1;
    // prompt user to input the height of the pyramid
    // making sure it's a positive int smaller than 23
    do
    {
    printf("I'm going to print you a pyramid. How tall do you want it to be?\n");
    printf("The height has to be greater than 0 and smaller than 23\n");
    height = GetInt();
    } while(height < 0 || height > 23);
    
    char maxSharp[23] = "#######################";
   
    // print the pyramid
    for(int i = 1; i <= height; i++)
    {
        // left side
        printf("%*s", height - i, "");
        printf("%.*s", i, maxSharp);
        // space
        printf("  ");
        // right side
        printf("%.*s", i, maxSharp);
        // new line
        printf("\n");
    }
    
    return 0;

}
