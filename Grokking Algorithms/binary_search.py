def binary_search(list, item):
    low = 0
    high = len(list) - 1

    i = 0
    while low <= high:
        print(i)
        i += 1
        mid = (low + high) // 2
        guess = list[mid]

        if guess == item:
            return mid

        if guess > item:
            high = mid - 1
        else:
            low = mid + 1

    return None


my_list = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
print(binary_search(my_list, 7))
