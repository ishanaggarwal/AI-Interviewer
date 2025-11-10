// LeetCode Easy Questions Database
// Contains real LeetCode problems with descriptions, examples, and constraints

const LEETCODE_EASY_QUESTIONS = [
    {
        id: 1,
        title: "Two Sum",
        difficulty: "Easy",
        description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
        examples: [
            {
                input: "nums = [2,7,11,15], target = 9",
                output: "[0,1]",
                explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
            },
            {
                input: "nums = [3,2,4], target = 6",
                output: "[1,2]"
            },
            {
                input: "nums = [3,3], target = 6",
                output: "[0,1]"
            }
        ],
        constraints: [
            "2 <= nums.length <= 10^4",
            "-10^9 <= nums[i] <= 10^9",
            "-10^9 <= target <= 10^9",
            "Only one valid answer exists."
        ]
    },
    {
        id: 13,
        title: "Roman to Integer",
        difficulty: "Easy",
        description: `Roman numerals are represented by seven different symbols: I, V, X, L, C, D and M.

Symbol       Value
I             1
V             5
X             10
L             50
C             100
D             500
M             1000

For example, 2 is written as II in Roman numeral, just two ones added together. 12 is written as XII, which is simply X + II. The number 27 is written as XXVII, which is XX + V + II.

Roman numerals are usually written largest to smallest from left to right. However, the numeral for four is not IIII. Instead, the number four is written as IV. Because the one is before the five we subtract it making four. The same principle applies to the number nine, which is written as IX.

There are six instances where subtraction is used:
- I can be placed before V (5) and X (10) to make 4 and 9.
- X can be placed before L (50) and C (100) to make 40 and 90.
- C can be placed before D (500) and M (1000) to make 400 and 900.

Given a roman numeral, convert it to an integer.`,
        examples: [
            {
                input: 's = "III"',
                output: "3",
                explanation: "III = 3."
            },
            {
                input: 's = "LVIII"',
                output: "58",
                explanation: "L = 50, V= 5, III = 3."
            },
            {
                input: 's = "MCMXCIV"',
                output: "1994",
                explanation: "M = 1000, CM = 900, XC = 90 and IV = 4."
            }
        ],
        constraints: [
            "1 <= s.length <= 15",
            "s contains only the characters ('I', 'V', 'X', 'L', 'C', 'D', 'M').",
            "It is guaranteed that s is a valid roman numeral in the range [1, 3999]."
        ]
    },
    {
        id: 20,
        title: "Valid Parentheses",
        difficulty: "Easy",
        description: `Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.`,
        examples: [
            {
                input: 's = "()"',
                output: "true"
            },
            {
                input: 's = "()[]{}"',
                output: "true"
            },
            {
                input: 's = "(]"',
                output: "false"
            }
        ],
        constraints: [
            "1 <= s.length <= 10^4",
            "s consists of parentheses only '()[]{}'"
        ]
    },
    {
        id: 21,
        title: "Merge Two Sorted Lists",
        difficulty: "Easy",
        description: `You are given the heads of two sorted linked lists list1 and list2.

Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.

Return the head of the merged linked list.`,
        examples: [
            {
                input: "list1 = [1,2,4], list2 = [1,3,4]",
                output: "[1,1,2,3,4,4]"
            },
            {
                input: "list1 = [], list2 = []",
                output: "[]"
            },
            {
                input: "list1 = [], list2 = [0]",
                output: "[0]"
            }
        ],
        constraints: [
            "The number of nodes in both lists is in the range [0, 50].",
            "-100 <= Node.val <= 100",
            "Both list1 and list2 are sorted in non-decreasing order."
        ]
    },
    {
        id: 125,
        title: "Valid Palindrome",
        difficulty: "Easy",
        description: `A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.

Given a string s, return true if it is a palindrome, or false otherwise.`,
        examples: [
            {
                input: 's = "A man, a plan, a canal: Panama"',
                output: "true",
                explanation: '"amanaplanacanalpanama" is a palindrome.'
            },
            {
                input: 's = "race a car"',
                output: "false",
                explanation: '"raceacar" is not a palindrome.'
            },
            {
                input: 's = " "',
                output: "true",
                explanation: 's is an empty string "" after removing non-alphanumeric characters. Since an empty string reads the same forward and backward, it is a palindrome.'
            }
        ],
        constraints: [
            "1 <= s.length <= 2 * 10^5",
            "s consists only of printable ASCII characters."
        ]
    },
    {
        id: 217,
        title: "Contains Duplicate",
        difficulty: "Easy",
        description: `Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.`,
        examples: [
            {
                input: "nums = [1,2,3,1]",
                output: "true"
            },
            {
                input: "nums = [1,2,3,4]",
                output: "false"
            },
            {
                input: "nums = [1,1,1,3,3,4,3,2,4,2]",
                output: "true"
            }
        ],
        constraints: [
            "1 <= nums.length <= 10^5",
            "-10^9 <= nums[i] <= 10^9"
        ]
    },
    {
        id: 242,
        title: "Valid Anagram",
        difficulty: "Easy",
        description: `Given two strings s and t, return true if t is an anagram of s, and false otherwise.

An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.`,
        examples: [
            {
                input: 's = "anagram", t = "nagaram"',
                output: "true"
            },
            {
                input: 's = "rat", t = "car"',
                output: "false"
            }
        ],
        constraints: [
            "1 <= s.length, t.length <= 5 * 10^4",
            "s and t consist of lowercase English letters."
        ]
    },
    {
        id: 70,
        title: "Climbing Stairs",
        difficulty: "Easy",
        description: `You are climbing a staircase. It takes n steps to reach the top.

Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?`,
        examples: [
            {
                input: "n = 2",
                output: "2",
                explanation: "There are two ways to climb to the top: 1. 1 step + 1 step, 2. 2 steps"
            },
            {
                input: "n = 3",
                output: "3",
                explanation: "There are three ways to climb to the top: 1. 1 step + 1 step + 1 step, 2. 1 step + 2 steps, 3. 2 steps + 1 step"
            }
        ],
        constraints: [
            "1 <= n <= 45"
        ]
    },
    {
        id: 121,
        title: "Best Time to Buy and Sell Stock",
        difficulty: "Easy",
        description: `You are given an array prices where prices[i] is the price of a given stock on the ith day.

You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.

Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.`,
        examples: [
            {
                input: "prices = [7,1,5,3,6,4]",
                output: "5",
                explanation: "Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5. Note that buying on day 2 and selling on day 1 is not allowed because you must buy before you sell."
            },
            {
                input: "prices = [7,6,4,3,1]",
                output: "0",
                explanation: "In this case, no transactions are done and the max profit = 0."
            }
        ],
        constraints: [
            "1 <= prices.length <= 10^5",
            "0 <= prices[i] <= 10^4"
        ]
    },
    {
        id: 206,
        title: "Reverse Linked List",
        difficulty: "Easy",
        description: `Given the head of a singly linked list, reverse the list, and return the reversed list.`,
        examples: [
            {
                input: "head = [1,2,3,4,5]",
                output: "[5,4,3,2,1]"
            },
            {
                input: "head = [1,2]",
                output: "[2,1]"
            },
            {
                input: "head = []",
                output: "[]"
            }
        ],
        constraints: [
            "The number of nodes in the list is the range [0, 5000].",
            "-5000 <= Node.val <= 5000"
        ]
    },
    {
        id: 283,
        title: "Move Zeroes",
        difficulty: "Easy",
        description: `Given an integer array nums, move all 0's to the end of it while maintaining the relative order of the non-zero elements.

Note that you must do this in-place without making a copy of the array.`,
        examples: [
            {
                input: "nums = [0,1,0,3,12]",
                output: "[1,3,12,0,0]"
            },
            {
                input: "nums = [0]",
                output: "[0]"
            }
        ],
        constraints: [
            "1 <= nums.length <= 10^4",
            "-2^31 <= nums[i] <= 2^31 - 1"
        ]
    },
    {
        id: 226,
        title: "Invert Binary Tree",
        difficulty: "Easy",
        description: `Given the root of a binary tree, invert the tree, and return its root.`,
        examples: [
            {
                input: "root = [4,2,7,1,3,6,9]",
                output: "[4,7,2,9,6,3,1]"
            },
            {
                input: "root = [2,1,3]",
                output: "[2,3,1]"
            },
            {
                input: "root = []",
                output: "[]"
            }
        ],
        constraints: [
            "The number of nodes in the tree is in the range [0, 100].",
            "-100 <= Node.val <= 100"
        ]
    }
];

// Export for use in other modules
if (typeof window !== 'undefined') {
    window.LEETCODE_EASY_QUESTIONS = LEETCODE_EASY_QUESTIONS;
}
