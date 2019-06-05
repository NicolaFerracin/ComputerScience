/**
* OSS
* Introduction to Computer Science
* Problem Set 2 - Standard Edition
* Vigenere
*/

#include <stdio.h>
#include <cs50.h>
#include <string.h>
#include <ctype.h>

int main(int argc, string argv[])
{
    if(argc < 2 || argc > 2)
    {
        printf("Please enter at least one valid command-line argument to proceed!\n");
        return 1;
    }
    int secret[strlen(argv[1])];
    // map encrypter word chars to position in alphabet
    for(int i = 0, n = strlen(argv[1]); i < n; i++)
    {
        if(!isalpha(argv[1][i]))
        {
        printf("Please enter at least one valid command-line argument to proceed!\n");
        return 1;
        }
        if(islower(argv[1][i]))
        {
            secret[i] = argv[1][i] - 97;
        }
        else
        {
            secret[i] = argv[1][i] - 65;
        }
    }
    int secretSize = sizeof(secret)/sizeof(secret[0]);
    char* input = GetString();
    int j = 0;
    for(int i = 0, n = strlen(input); i < n; i++)
    {
        if(!isalpha(input[i]))
        {
            printf("%c", input[i]);
        }
        else if(islower(input[i]))
        {
            printf("%c", (((input[i] - 97 + secret[j % secretSize])) % 26) + 97);
            j++;
        }
        else
        {
            printf("%c", (((input[i] - 65 + secret[j % secretSize])) % 26) + 65);
            j++;
        }
    }
    printf("\n");
    
    return 0;
}
