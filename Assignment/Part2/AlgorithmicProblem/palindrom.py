string1 = input()
string2 = string1[::-1]


def check_palindrome():
    return string1 == string2


if(check_palindrome()):
    print('Palindrome')
else:
    print('Not a palindrome')
