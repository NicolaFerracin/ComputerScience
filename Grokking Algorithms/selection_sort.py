def selection_sort(list):
    for i in range(len(list)):

        smallest_index = i

        for x in range(smallest_index + 1, len(list)):
            if list[x] < list[smallest_index]:
                smallest_index = x

        list[i], list[smallest_index] = list[smallest_index], list[i]

    return list

print(selection_sort([5, 3, 6, 2, 10]))
