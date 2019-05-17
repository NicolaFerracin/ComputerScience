def quick_sort(list):
    if len(list) < 2:
        return list

    pivot = list[len(list) // 2]
    smaller = [i for i in list if i < pivot]
    equal = [i for i in list if i == pivot]
    greater = [i for i in list if i > pivot]

    return quick_sort(smaller) + equal + quick_sort(greater)


print(quick_sort([5, 4, 9, 9, 10, 2, 123, 3]))
