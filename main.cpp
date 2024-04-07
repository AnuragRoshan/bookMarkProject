#include <iostream>
#include <vector>
#include <cmath>

using namespace std;

int minStepsToSort(vector<int>& arr) {
    int n = arr.size();
    int steps = 0;

    for (int i = 0; i < n; ++i) {
        if (arr[i] != i + 1) {
            int num = arr[i];
            arr[i] = 0; // Empty the current position
            arr[num - 1] = num; // Move the number to its correct position
            ++steps; // Increment steps for each movement
        }
    }

    return steps;
}

int main() {
    vector<int> arr = {3,2,1,4};
    int steps = minStepsToSort(arr);
    cout << "Minimum steps required to sort the array: " << steps << endl;
    return 0;
}
