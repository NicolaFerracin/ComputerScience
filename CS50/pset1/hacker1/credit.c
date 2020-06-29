/**
* OSS
* Introduction to Computer Science
* Problem Set 1 - Hacker Edition
* Bad Credit
*/

#include <stdio.h>
#include <cs50.h>
#include <string.h>

int main(void)
{
    // instantiate variables
    char cc[16]; // will hold the credit card number as char
    int sum = 0; // sum to establish if the card is valid
    int currDigit = 0; // current digit we are checking
    char tempChar[2]; // temp string to allow going throuhg the digits of a number
    int tempInt = 0; // temp int to allow number doubling
    int remainder = 0; // remainder used to check even or odd positioned digits
    
    // ask user to input credit card number
    printf("Please, insert your Credit Card Number:\n");
    
    // get credit card number long long
    long long ll = GetLongLong();
    
    // typecast long long into a char
    sprintf(cc, "%llu", ll);
    int ccLen = strlen(cc);
    
    // check if doubling even or odd positioned digits based on length
    if(ccLen % 2 == 0)
    {
        remainder = 0;
    }
    else
    {
        remainder = 1;
    }
    
    // check if number is valid by looping through it
    for(int i = 0; i < ccLen; i++)
    {
        currDigit = (int)cc[i] - '0';
        // if digit in even position
        if((i + remainder) % 2 != 0)
        {
            // add to sum
            sum += currDigit;
        }
        // if digit in odd position
        else
        {
            // multiply digit by 2 and assign to temp
            tempInt = currDigit * 2;
            sprintf(tempChar, "%d", tempInt);
            int tempLen = strlen(tempChar);
            // for each digit in temp
            for(int j = 0; j < tempLen; j++)
            { 
                // add digit to sum
                sum += (int)tempChar[j] - '0';
            }
        }
     }
     //if sum % 10 != 0
     if(sum % 10 != 0)
     {
        // return INVALID
        printf("INVALID\n");
        return 0;
     }
            
     // check credit card name
     int digitOne = cc[0] - '0';
     int digitTwo = cc[1] - '0';
     // if first digit of card number equals 4
     if(digitOne == 4)
     {
        // print VISA
        printf("VISA\n");
     }
     // else if first two digits are 34 or 37
     else if(digitOne == 3 && (digitTwo == 4 || digitTwo == 7))
     {
        // print AMEX 
        printf("AMEX\n");
     }
     // else if first two digits equal between 51 and 55 inclusive
     else if(digitOne == 5 && (digitTwo >= 1 && digitTwo <= 5))
     {
        // print MASTERCARD
        printf("MASTERCARD\n");
     }
     else
     {
        printf("INVALID\n");
     }  
     return 0;
}
