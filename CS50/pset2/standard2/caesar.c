/**
* OSS
* Introduction to Computer Science
* Problem Set 2 - Standard Edition
* Hail, Caesar!
*/

#include <stdio.h>
#include <cs50.h>
#include <string.h>
#include <ctype.h>

int main(int argc, string argv[])
{
    if(argc < 2 || argc > 2)
    {
        printf("Please enter a command-line argument to proceed!\n");
        return 1;
    }
    
    int k = atoi(argv[1]);
    char* input = GetString();

    for(int i = 0, n = strlen(input); i < n; i++)
    {
        if(!isalpha(input[i]))
        {
            printf("%c", input[i]);
        }
        else if(islower(input[i]))
        {
            printf("%c", ((input[i] - 97 + k) % 26) + 97);
        }
        else
        {
            printf("%c", ((input[i] - 65 + k) % 26) + 65);
        }
    }
    printf("\n");
    
    return 0;
}
