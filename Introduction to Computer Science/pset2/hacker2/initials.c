/**
* OSS
* Introduction to Computer Science
* Problem Set 2 - Hacker Edition
* Initials
*/

#include <stdio.h>
#include <cs50.h>
#include <string.h>
#include <ctype.h>

int main(void)
{
	string name = GetString();
	bool isLastCharSpace = false;
	for(int i = 0, n = strlen(name); i <n; i++)
	{
		if(isspace(name[i]))
		{
			isLastCharSpace = true;
		}
		else if(isLastCharSpace || i == 0)
		{
			printf("%c", toupper(name[i]));
			isLastCharSpace = false;
		}
	}
    printf("\n");
	return 0;
}
