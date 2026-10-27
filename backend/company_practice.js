// Practice questions with answers (aptitude, reasoning, verbal, coding) for every company in company_notes.js.
// These are practice material written in the style of each company's test, NOT reported papers, so they carry s: 0 (no source).
module.exports = {
 "tcs": [
  {
   "name": "Practice: Quantitative aptitude",
   "practice": true,
   "note": "Practice questions written in the style of TCS NQT Foundation (numerical, verbal, reasoning) and the easy-to-medium coding questions of NQT Advanced. They are not reported papers; use them to build speed with formulas and shortcuts.",
   "questions": [
    {
     "q": "A train 150 m long crosses a pole in 15 seconds. What is its speed in km/h?",
     "a": "36 km/h. Speed = 150/15 = 10 m/s. Multiply by 18/5 to convert to km/h: 10 x 3.6 = 36.",
     "s": 0
    },
    {
     "q": "Two numbers are in the ratio 3:5 and their sum is 160. Find the larger number.",
     "a": "100. One part = 160/8 = 20, so the numbers are 60 and 100.",
     "s": 0
    },
    {
     "q": "The price of an item is increased by 20% and then decreased by 20%. What is the net change?",
     "a": "A 4% decrease. Net % = 20 - 20 - (20 x 20)/100 = -4%. Check with 100: 120, then 120 x 0.8 = 96.",
     "s": 0
    },
    {
     "q": "Find the simple interest on Rs 8,000 at 5% per annum for 3 years.",
     "a": "Rs 1,200. SI = P x R x T / 100 = 8000 x 5 x 3 / 100 = 1200.",
     "s": 0
    },
    {
     "q": "Find the compound interest on Rs 5,000 at 10% per annum for 2 years (compounded yearly).",
     "a": "Rs 1,050. Amount = 5000 x 1.1 x 1.1 = 6050, so CI = 6050 - 5000 = 1050.",
     "s": 0
    }
   ]
  },
  {
   "name": "Practice: Logical reasoning",
   "practice": true,
   "note": "Practice questions written in the style of TCS NQT Foundation (numerical, verbal, reasoning) and the easy-to-medium coding questions of NQT Advanced. They are not reported papers; draw the diagram or table first, then answer.",
   "questions": [
    {
     "q": "Pointing to a man, a woman says: \"His mother is the only daughter of my mother.\" How is the woman related to the man?",
     "a": "She is his mother. The only daughter of the woman's mother is the woman herself, so the man's mother is the woman.",
     "s": 0
    },
    {
     "q": "If CAT is coded as 3-1-20 (alphabet positions), how is DOG coded?",
     "a": "4-15-7. D = 4, O = 15, G = 7.",
     "s": 0
    },
    {
     "q": "Find the next letter: A, C, F, J, O, ?",
     "a": "U. The gaps are +2, +3, +4, +5, so the next gap is +6: O (15) + 6 = 21 = U.",
     "s": 0
    },
    {
     "q": "A man walks 5 km north, turns right and walks 3 km, turns right again and walks 5 km. How far is he from the start?",
     "a": "3 km. After the two right turns he is walking south, so he comes back level with the start, 3 km to the east.",
     "s": 0
    }
   ]
  },
  {
   "name": "Practice: Verbal ability and communication",
   "practice": true,
   "note": "Practice questions written in the style of TCS NQT Foundation (numerical, verbal, reasoning) and the easy-to-medium coding questions of NQT Advanced. They are not reported papers; read each option fully before choosing.",
   "questions": [
    {
     "q": "Choose the synonym of METICULOUS: careless / careful and precise / lazy / angry",
     "a": "Careful and precise. A meticulous person pays great attention to detail.",
     "s": 0
    },
    {
     "q": "Choose the antonym of BENEVOLENT: kind / generous / malevolent / helpful",
     "a": "Malevolent. Benevolent means well-meaning and kind; malevolent means wishing harm.",
     "s": 0
    },
    {
     "q": "Fill in the blank: She has been working in this company ___ 2019. (since / for / from / by)",
     "a": "since. Use 'since' with a point in time (2019) and 'for' with a period (for five years).",
     "s": 0
    },
    {
     "q": "Correct the sentence: \"Each of the students have submitted the form.\"",
     "a": "\"Each of the students has submitted the form.\" 'Each' is singular, so it takes 'has'.",
     "s": 0
    }
   ]
  },
  {
   "name": "Practice: Coding",
   "practice": true,
   "note": "Practice questions written in the style of TCS NQT Foundation (numerical, verbal, reasoning) and the easy-to-medium coding questions of NQT Advanced. They are not reported papers; write each solution yourself before reading the answer.",
   "questions": [
    {
     "q": "Reverse a string without using built-in reverse functions.",
     "a": "Swap characters from both ends, or build the result by walking the string backwards. Time O(n).\n\nPython solution (the same logic works in C, C++ and Java):\ndef reverse(s):\n    out = ''\n    for ch in s:\n        out = ch + out\n    return out",
     "s": 0
    },
    {
     "q": "Check whether a number is a palindrome (for example 121).",
     "a": "Reverse the digits with % 10 and // 10 and compare with the original. Time O(digits).\n\nPython solution (the same logic works in C, C++ and Java):\ndef is_pal(n):\n    r, t = 0, n\n    while t > 0:\n        r = r * 10 + t % 10\n        t //= 10\n    return r == n",
     "s": 0
    },
    {
     "q": "Print numbers 1 to n; for multiples of 3 print Fizz, for multiples of 5 print Buzz, for both print FizzBuzz.",
     "a": "Test the multiple of 15 first, otherwise the Fizz or Buzz branch would catch it. Time O(n).\n\nPython solution (the same logic works in C, C++ and Java):\ndef fizzbuzz(n):\n    out = []\n    for i in range(1, n + 1):\n        if i % 15 == 0: out.append('FizzBuzz')\n        elif i % 3 == 0: out.append('Fizz')\n        elif i % 5 == 0: out.append('Buzz')\n        else: out.append(str(i))\n    return out",
     "s": 0
    }
   ]
  }
 ],
 "infosys": [
  {
   "name": "Practice: Quantitative aptitude",
   "practice": true,
   "note": "Practice questions written in the style of the Infosys InfyTQ / Springboard style test: mathematical ability, logical reasoning, puzzles and verbal ability. They are not reported papers; use them to build speed with formulas and shortcuts.",
   "questions": [
    {
     "q": "A can finish a job in 12 days and B in 18 days. In how many days will they finish it together?",
     "a": "7.2 days. Combined rate = 1/12 + 1/18 = 5/36 per day, so time = 36/5 = 7.2 days.",
     "s": 0
    },
    {
     "q": "The average of 5 numbers is 24. If one number is removed, the average of the remaining 4 is 22. Which number was removed?",
     "a": "32. Total of 5 numbers = 120, total of 4 = 88, so the removed number is 120 - 88 = 32.",
     "s": 0
    },
    {
     "q": "Pipe A fills a tank in 6 hours and pipe B empties it in 10 hours. If both are open, how long to fill the tank?",
     "a": "15 hours. Net rate = 1/6 - 1/10 = 1/15 per hour.",
     "s": 0
    },
    {
     "q": "Two fair dice are thrown. What is the probability that the sum is 8?",
     "a": "5/36. Favourable outcomes: (2,6), (3,5), (4,4), (5,3), (6,2) = 5 out of 36.",
     "s": 0
    }
   ]
  },
  {
   "name": "Practice: Logical reasoning",
   "practice": true,
   "note": "Practice questions written in the style of the Infosys InfyTQ / Springboard style test: mathematical ability, logical reasoning, puzzles and verbal ability. They are not reported papers; draw the diagram or table first, then answer.",
   "questions": [
    {
     "q": "Five friends P, Q, R, S, T sit in a row. P is at the left end, T is at the right end, Q sits next to P, and S is not next to T. What is the order?",
     "a": "P Q S R T. Q is second. S and R fill places 3 and 4, and S cannot be next to T, so S is third and R is fourth.",
     "s": 0
    },
    {
     "q": "Statements: All cats are animals. Some animals are dogs. Conclusion: Some cats are dogs. Does the conclusion follow?",
     "a": "No. The animals that are dogs may not include any cat. Draw it as circles: cats sit inside animals, and dogs only overlap animals somewhere else.",
     "s": 0
    },
    {
     "q": "Find the odd one out: 8, 27, 64, 100, 125",
     "a": "100. All the others are perfect cubes (2^3, 3^3, 4^3, 5^3).",
     "s": 0
    },
    {
     "q": "If the 5th of a month is a Monday, what day is the 25th?",
     "a": "Sunday. 25 - 5 = 20 days later. 20 mod 7 = 6, and Monday + 6 days = Sunday.",
     "s": 0
    },
    {
     "q": "Rohan ranks 12th from the top and 28th from the bottom in a class. How many students are in the class?",
     "a": "39. Total = 12 + 28 - 1 = 39.",
     "s": 0
    }
   ]
  },
  {
   "name": "Practice: Verbal ability and communication",
   "practice": true,
   "note": "Practice questions written in the style of the Infosys InfyTQ / Springboard style test: mathematical ability, logical reasoning, puzzles and verbal ability. They are not reported papers; read each option fully before choosing.",
   "questions": [
    {
     "q": "What does the idiom \"break the ice\" mean?",
     "a": "To start a conversation in an awkward or formal situation, for example by making a light remark.",
     "s": 0
    },
    {
     "q": "Give one word for \"a person who loves books\".",
     "a": "Bibliophile.",
     "s": 0
    },
    {
     "q": "Fill in the blank: He is very good ___ mathematics. (in / at / on / with)",
     "a": "at. We say 'good at' a subject or skill.",
     "s": 0
    },
    {
     "q": "Change to passive voice: \"The chef cooked the meal.\"",
     "a": "\"The meal was cooked by the chef.\" The object becomes the subject and the verb takes was/were + past participle.",
     "s": 0
    }
   ]
  },
  {
   "name": "Practice: Coding",
   "practice": true,
   "note": "Practice questions written in the style of the Infosys InfyTQ / Springboard style test: mathematical ability, logical reasoning, puzzles and verbal ability. They are not reported papers; write each solution yourself before reading the answer.",
   "questions": [
    {
     "q": "Print the first n Fibonacci numbers.",
     "a": "Keep the last two numbers and update them in a loop. Time O(n), space O(1).\n\nPython solution (the same logic works in C, C++ and Java):\ndef fib(n):\n    a, b, out = 0, 1, []\n    for _ in range(n):\n        out.append(a)\n        a, b = b, a + b\n    return out",
     "s": 0
    },
    {
     "q": "Check whether a number is prime.",
     "a": "Check divisors only up to sqrt(n). Numbers below 2 are not prime. Time O(sqrt n).\n\nPython solution (the same logic works in C, C++ and Java):\ndef is_prime(n):\n    if n < 2:\n        return False\n    i = 2\n    while i * i <= n:\n        if n % i == 0:\n            return False\n        i += 1\n    return True",
     "s": 0
    },
    {
     "q": "Find the second largest element in an array without sorting.",
     "a": "Track the largest and second largest in one pass. Time O(n), space O(1).\n\nPython solution (the same logic works in C, C++ and Java):\ndef second_largest(a):\n    first = second = float('-inf')\n    for x in a:\n        if x > first:\n            first, second = x, first\n        elif first > x > second:\n            second = x\n    return second",
     "s": 0
    }
   ]
  }
 ],
 "wipro": [
  {
   "name": "Practice: Quantitative aptitude",
   "practice": true,
   "note": "Practice questions written in the style of the Wipro NLTH / Elite online test: quantitative aptitude, logical reasoning, verbal ability and a coding section. They are not reported papers; use them to build speed with formulas and shortcuts.",
   "questions": [
    {
     "q": "How many different arrangements can be made from the letters of the word LEVEL?",
     "a": "30. The word has 5 letters with L twice and E twice: 5!/(2! x 2!) = 120/4 = 30.",
     "s": 0
    },
    {
     "q": "An article bought for Rs 500 is sold for Rs 575. Find the profit percentage.",
     "a": "15%. Profit = 75, and 75/500 x 100 = 15%.",
     "s": 0
    },
    {
     "q": "A boat goes 48 km downstream and returns 48 km upstream. Boat speed in still water is 12 km/h and the stream is 4 km/h. Total time?",
     "a": "9 hours. Downstream speed 16 km/h gives 3 h. Upstream speed 8 km/h gives 6 h. Total = 9 h.",
     "s": 0
    },
    {
     "q": "A shirt is marked Rs 800. Successive discounts of 15% and 10% are given. What is the selling price?",
     "a": "Rs 612. 800 x 0.85 x 0.90 = 612.",
     "s": 0
    },
    {
     "q": "Find the next number: 2, 6, 12, 20, 30, ?",
     "a": "42. The differences are 4, 6, 8, 10, 12, so the next term is 30 + 12 = 42. (The terms are n x (n+1).)",
     "s": 0
    }
   ]
  },
  {
   "name": "Practice: Logical reasoning",
   "practice": true,
   "note": "Practice questions written in the style of the Wipro NLTH / Elite online test: quantitative aptitude, logical reasoning, verbal ability and a coding section. They are not reported papers; draw the diagram or table first, then answer.",
   "questions": [
    {
     "q": "2 : 8 :: 3 : 27 :: 4 : ?",
     "a": "64. The pattern is n to n^3.",
     "s": 0
    },
    {
     "q": "If TAKE is written as UBLF (each letter moved one step forward), how is MAKE written?",
     "a": "NBLF. Move every letter one step forward in the alphabet.",
     "s": 0
    },
    {
     "q": "A says \"B is a liar\". B says \"A and I are both liars\". Who is telling the truth?",
     "a": "A tells the truth and B is lying. If B were truthful, his statement would make him a liar, which is a contradiction. So B lies, which makes A's statement true.",
     "s": 0
    },
    {
     "q": "If a pen is called table, a table is called chair, and a chair is called bag, what do we sit on?",
     "a": "A bag. We sit on a chair, and a chair is called bag in this code.",
     "s": 0
    }
   ]
  },
  {
   "name": "Practice: Verbal ability and communication",
   "practice": true,
   "note": "Practice questions written in the style of the Wipro NLTH / Elite online test: quantitative aptitude, logical reasoning, verbal ability and a coding section. They are not reported papers; read each option fully before choosing.",
   "questions": [
    {
     "q": "Change to reported speech: He said, \"I am tired.\"",
     "a": "\"He said that he was tired.\" Present tense moves to past tense and the pronoun changes from I to he.",
     "s": 0
    },
    {
     "q": "Choose the correctly spelt word: occurence / occurrence / ocurrence / occurance",
     "a": "occurrence. It has a double c and a double r.",
     "s": 0
    },
    {
     "q": "Arrange into a sentence: (P) to the market (Q) she goes (R) every Sunday (S) with her mother",
     "a": "QPSR: \"She goes to the market with her mother every Sunday.\" Start with the subject and verb, then place, company and time.",
     "s": 0
    },
    {
     "q": "Fill in the blank: He is ___ honest man. (a / an / the / no article)",
     "a": "an. 'Honest' starts with a vowel sound because the h is silent.",
     "s": 0
    }
   ]
  },
  {
   "name": "Practice: Coding",
   "practice": true,
   "note": "Practice questions written in the style of the Wipro NLTH / Elite online test: quantitative aptitude, logical reasoning, verbal ability and a coding section. They are not reported papers; write each solution yourself before reading the answer.",
   "questions": [
    {
     "q": "Count the vowels in a string.",
     "a": "Loop once and test each character against 'aeiou' (after lower-casing). Time O(n).\n\nPython solution (the same logic works in C, C++ and Java):\ndef vowels(s):\n    return sum(1 for c in s.lower() if c in 'aeiou')",
     "s": 0
    },
    {
     "q": "An array has the numbers 1 to n with one number missing. Find it.",
     "a": "The expected sum is n(n+1)/2. Subtract the actual sum. Time O(n), space O(1).\n\nPython solution (the same logic works in C, C++ and Java):\ndef missing(a):\n    n = len(a) + 1\n    return n * (n + 1) // 2 - sum(a)",
     "s": 0
    },
    {
     "q": "Check whether two strings are anagrams.",
     "a": "Compare the sorted letters, or compare character counts. Counting is O(n).\n\nPython solution (the same logic works in C, C++ and Java):\nfrom collections import Counter\ndef anagram(a, b):\n    return Counter(a) == Counter(b)",
     "s": 0
    }
   ]
  }
 ],
 "accenture": [
  {
   "name": "Practice: Quantitative aptitude",
   "practice": true,
   "note": "Practice questions written in the style of the Accenture cognitive assessment (numerical, reasoning, verbal), the communication assessment and the coding section. They are not reported papers; use them to build speed with formulas and shortcuts.",
   "questions": [
    {
     "q": "The HCF of two numbers is 12, their LCM is 180 and one number is 36. Find the other number.",
     "a": "60. Product of the numbers = HCF x LCM = 2160, so the other = 2160/36 = 60.",
     "s": 0
    },
    {
     "q": "If 35% of a number is 84, what is the number?",
     "a": "240. Number = 84 x 100/35 = 240.",
     "s": 0
    },
    {
     "q": "A father is 3 times as old as his son. After 12 years he will be twice as old. Find the father's present age.",
     "a": "36 years. Let the son be x: 3x + 12 = 2(x + 12), so x = 12 and the father is 36.",
     "s": 0
    },
    {
     "q": "A 40-litre mixture has milk and water in the ratio 3:1. How much water must be added to make the ratio 3:2?",
     "a": "10 litres. Milk = 30 L, water = 10 L. For 3:2 water must be 20 L, so add 10 L.",
     "s": 0
    }
   ]
  },
  {
   "name": "Practice: Logical reasoning",
   "practice": true,
   "note": "Practice questions written in the style of the Accenture cognitive assessment (numerical, reasoning, verbal), the communication assessment and the coding section. They are not reported papers; draw the diagram or table first, then answer.",
   "questions": [
    {
     "q": "A is twice as old as B. Five years ago A was three times as old as B. How old is A now?",
     "a": "20 years. Let B = x. 2x - 5 = 3(x - 5), so x = 10 and A = 20.",
     "s": 0
    },
    {
     "q": "A cube of side 3 cm is painted on all faces and cut into 27 small cubes of 1 cm. How many small cubes have exactly two painted faces?",
     "a": "12. These are the edge cubes (not corners): 12 edges x 1 middle cube each = 12.",
     "s": 0
    },
    {
     "q": "Find the next number: 1, 1, 2, 3, 5, 8, ?",
     "a": "13. Each number is the sum of the previous two (Fibonacci).",
     "s": 0
    },
    {
     "q": "Find the next number: 7, 10, 8, 11, 9, 12, ?",
     "a": "10. Two series are mixed: +3, -2, +3, -2... After 12, subtract 2 to get 10.",
     "s": 0
    }
   ]
  },
  {
   "name": "Practice: Verbal ability and communication",
   "practice": true,
   "note": "Practice questions written in the style of the Accenture cognitive assessment (numerical, reasoning, verbal), the communication assessment and the coding section. They are not reported papers; read each option fully before choosing.",
   "questions": [
    {
     "q": "Fill in the blank: By the time we reached the station, the train ___. (left / had left / has left / was leaving)",
     "a": "had left. Use the past perfect for the action that finished first.",
     "s": 0
    },
    {
     "q": "Fill in the blank: Neither of the answers ___ correct. (is / are / were / have been)",
     "a": "is. 'Neither' is singular here, so it takes a singular verb.",
     "s": 0
    },
    {
     "q": "Fill in the blank: ___ going to submit the report by Friday. (Their / There / They're / Theyre)",
     "a": "They're, the short form of 'they are'.",
     "s": 0
    },
    {
     "q": "Fill in the blank: If I ___ you, I would apologise. (was / were / am / be)",
     "a": "were. Use 'were' for all subjects in an unreal (second) conditional.",
     "s": 0
    },
    {
     "q": "Rewrite politely for an email: \"Send me the report now.\"",
     "a": "\"Could you please send me the report at your earliest convenience?\" Use a polite request, a softener such as please, and avoid commands.",
     "s": 0
    }
   ]
  },
  {
   "name": "Practice: Coding",
   "practice": true,
   "note": "Practice questions written in the style of the Accenture cognitive assessment (numerical, reasoning, verbal), the communication assessment and the coding section. They are not reported papers; write each solution yourself before reading the answer.",
   "questions": [
    {
     "q": "Swap two numbers without using a third variable.",
     "a": "Use arithmetic: a = a + b; b = a - b; a = a - b (or XOR). In Python a tuple swap does it directly, but interviewers expect the arithmetic version.\n\nPython solution (the same logic works in C, C++ and Java):\ndef swap(a, b):\n    a = a + b\n    b = a - b\n    a = a - b\n    return a, b",
     "s": 0
    },
    {
     "q": "Check whether a number is an Armstrong number (153 = 1^3 + 5^3 + 3^3).",
     "a": "Raise each digit to the power of the number of digits and add them up.\n\nPython solution (the same logic works in C, C++ and Java):\ndef armstrong(n):\n    d = str(n)\n    return sum(int(c) ** len(d) for c in d) == n",
     "s": 0
    },
    {
     "q": "Find the GCD of two numbers.",
     "a": "Euclid's algorithm: gcd(a, b) = gcd(b, a % b) until b is 0. Time O(log min(a, b)).\n\nPython solution (the same logic works in C, C++ and Java):\ndef gcd(a, b):\n    while b:\n        a, b = b, a % b\n    return a",
     "s": 0
    }
   ]
  }
 ],
 "cognizant": [
  {
   "name": "Practice: Quantitative aptitude",
   "practice": true,
   "note": "Practice questions written in the style of the Cognizant GenC online test, which is heavy on logical reasoning. They are not reported papers; use them to build speed with formulas and shortcuts.",
   "questions": [
    {
     "q": "A town has a population of 20,000 growing 10% every year. What is the population after 2 years?",
     "a": "24,200. 20000 x 1.1 x 1.1 = 24200.",
     "s": 0
    },
    {
     "q": "A man goes to his office at 40 km/h and returns at 60 km/h. What is his average speed?",
     "a": "48 km/h. For equal distances, average = 2ab/(a+b) = 2 x 40 x 60 / 100 = 48.",
     "s": 0
    },
    {
     "q": "A committee of 3 is chosen from 6 men and 4 women with at least one woman. How many ways?",
     "a": "100. Total ways C(10,3) = 120. Ways with no woman C(6,3) = 20. So 120 - 20 = 100.",
     "s": 0
    },
    {
     "q": "What is the angle between the hands of a clock at 3:40?",
     "a": "130 degrees. Hour hand = 3 x 30 + 40 x 0.5 = 110 degrees. Minute hand = 40 x 6 = 240 degrees. Difference = 130.",
     "s": 0
    }
   ]
  },
  {
   "name": "Practice: Logical reasoning",
   "practice": true,
   "note": "Practice questions written in the style of the Cognizant GenC online test, which is heavy on logical reasoning. They are not reported papers; draw the diagram or table first, then answer.",
   "questions": [
    {
     "q": "A person facing north turns 90 degrees right and then 135 degrees left. Which direction is he facing now?",
     "a": "North-west. Right turn from north gives east. Turning 135 degrees left (anticlockwise) from east gives north-west.",
     "s": 0
    },
    {
     "q": "A is the brother of B. B is the sister of C. C is the father of D. How is D related to A?",
     "a": "D is A's nephew or niece. A and C are siblings, so C's child D is A's brother's child.",
     "s": 0
    },
    {
     "q": "In how many ways can 6 people sit around a circular table?",
     "a": "120. Circular arrangements = (n - 1)! = 5! = 120.",
     "s": 0
    },
    {
     "q": "Find the odd pair out: AZ, BY, CX, DV, EU",
     "a": "DV. The pattern pairs letters from opposite ends (A-Z, B-Y, C-X), so the fourth should be DW.",
     "s": 0
    },
    {
     "q": "Doctor : Hospital :: Teacher : ?",
     "a": "School. A doctor works in a hospital and a teacher works in a school.",
     "s": 0
    },
    {
     "q": "If + means x, - means /, x means -, and / means +, find 12 + 3 - 4 x 5 / 2.",
     "a": "6. Replace the symbols: 12 x 3 / 4 - 5 + 2 = 9 - 5 + 2 = 6.",
     "s": 0
    }
   ]
  },
  {
   "name": "Practice: Verbal ability and communication",
   "practice": true,
   "note": "Practice questions written in the style of the Cognizant GenC online test, which is heavy on logical reasoning. They are not reported papers; read each option fully before choosing.",
   "questions": [
    {
     "q": "What does the phrasal verb \"call off\" mean?",
     "a": "To cancel. Example: \"The match was called off because of rain.\"",
     "s": 0
    },
    {
     "q": "Fill in the blank: The new policy will ___ all employees. (affect / effect)",
     "a": "affect. 'Affect' is usually the verb (to influence) and 'effect' is usually the noun (a result).",
     "s": 0
    },
    {
     "q": "Choose the synonym of CANDID: frank / secretive / shy / rude",
     "a": "Frank. A candid reply is open and honest.",
     "s": 0
    },
    {
     "q": "Choose the antonym of SCARCE: rare / abundant / limited / costly",
     "a": "Abundant. Scarce means in short supply.",
     "s": 0
    }
   ]
  },
  {
   "name": "Practice: Coding",
   "practice": true,
   "note": "Practice questions written in the style of the Cognizant GenC online test, which is heavy on logical reasoning. They are not reported papers; write each solution yourself before reading the answer.",
   "questions": [
    {
     "q": "Given an array and a target, return the indices of two numbers that add up to the target.",
     "a": "Store each number's index in a hash map and look up target - x as you go. Time O(n), space O(n).\n\nPython solution (the same logic works in C, C++ and Java):\ndef two_sum(a, target):\n    seen = {}\n    for i, x in enumerate(a):\n        if target - x in seen:\n            return seen[target - x], i\n        seen[x] = i",
     "s": 0
    },
    {
     "q": "Check whether a string of brackets ()[]{} is valid.",
     "a": "Push opening brackets on a stack; on a closing bracket the stack top must be its partner. At the end the stack must be empty. Time O(n).\n\nPython solution (the same logic works in C, C++ and Java):\ndef valid(s):\n    pair = {')': '(', ']': '[', '}': '{'}\n    st = []\n    for c in s:\n        if c in '([{':\n            st.append(c)\n        elif not st or st.pop() != pair[c]:\n            return False\n    return not st",
     "s": 0
    }
   ]
  }
 ],
 "capgemini": [
  {
   "name": "Practice: Quantitative aptitude",
   "practice": true,
   "note": "Practice questions written in the style of the Capgemini written round (English communication, pseudocode) and the coding round. They are not reported papers; use them to build speed with formulas and shortcuts.",
   "questions": [
    {
     "q": "What is the remainder when 7^100 is divided by 5?",
     "a": "1. 7 leaves remainder 2, and powers of 2 repeat as 2, 4, 3, 1 (cycle of 4). 100 is a multiple of 4, so the remainder is 1.",
     "s": 0
    },
    {
     "q": "How many trailing zeros does 100! have?",
     "a": "24. Count factors of 5: 100/5 + 100/25 = 20 + 4 = 24.",
     "s": 0
    },
    {
     "q": "12 men can finish a job in 8 days. How many days will 16 men take?",
     "a": "6 days. Total work = 12 x 8 = 96 man-days. 96/16 = 6.",
     "s": 0
    }
   ]
  },
  {
   "name": "Practice: Logical reasoning",
   "practice": true,
   "note": "Practice questions written in the style of the Capgemini written round (English communication, pseudocode) and the coding round. They are not reported papers; draw the diagram or table first, then answer.",
   "questions": [
    {
     "q": "Look at the series: 2, 3, 5, 7, 11, 13, ?",
     "a": "17. These are consecutive prime numbers.",
     "s": 0
    },
    {
     "q": "In a code language, 'MANGO' is written as 'NBOHP'. How is 'APPLE' written?",
     "a": "BQQMF. Every letter moves one step forward: A-B, P-Q, P-Q, L-M, E-F.",
     "s": 0
    },
    {
     "q": "Raju is taller than Sam but shorter than Tom. Vimal is shorter than Sam. Who is the tallest and who is the shortest?",
     "a": "Tom is the tallest and Vimal is the shortest. The order is Tom > Raju > Sam > Vimal.",
     "s": 0
    }
   ]
  },
  {
   "name": "Practice: Verbal ability and communication",
   "practice": true,
   "note": "Practice questions written in the style of the Capgemini written round (English communication, pseudocode) and the coding round. They are not reported papers; read each option fully before choosing.",
   "questions": [
    {
     "q": "Correct the sentence: \"She is more smarter than her brother.\"",
     "a": "\"She is smarter than her brother.\" Do not use 'more' together with the -er form.",
     "s": 0
    },
    {
     "q": "Fill in the blank: He avoided ___ the question. (answer / to answer / answering / answered)",
     "a": "answering. The verb 'avoid' is followed by a gerund (-ing form).",
     "s": 0
    },
    {
     "q": "Correct the sentence: \"Many a man have failed here.\"",
     "a": "\"Many a man has failed here.\" 'Many a' takes a singular noun and a singular verb.",
     "s": 0
    },
    {
     "q": "What does \"once in a blue moon\" mean?",
     "a": "Very rarely. Example: \"We eat out once in a blue moon.\"",
     "s": 0
    },
    {
     "q": "Choose the antonym of EXPAND: grow / contract / spread / extend",
     "a": "Contract. To expand is to become larger; to contract is to become smaller.",
     "s": 0
    }
   ]
  },
  {
   "name": "Practice: Coding",
   "practice": true,
   "note": "Practice questions written in the style of the Capgemini written round (English communication, pseudocode) and the coding round. They are not reported papers; write each solution yourself before reading the answer.",
   "questions": [
    {
     "q": "Find the maximum sum of a contiguous subarray (Kadane's algorithm).",
     "a": "At each element either extend the current subarray or start fresh. Time O(n), space O(1).\n\nPython solution (the same logic works in C, C++ and Java):\ndef kadane(a):\n    best = cur = a[0]\n    for x in a[1:]:\n        cur = max(x, cur + x)\n        best = max(best, cur)\n    return best",
     "s": 0
    },
    {
     "q": "Find the first non-repeating character in a string.",
     "a": "Count every character in one pass, then scan again for the first one with count 1. Time O(n).\n\nPython solution (the same logic works in C, C++ and Java):\nfrom collections import Counter\ndef first_unique(s):\n    c = Counter(s)\n    for ch in s:\n        if c[ch] == 1:\n            return ch\n    return None",
     "s": 0
    },
    {
     "q": "Rotate an array to the right by k positions.",
     "a": "Use k = k % n, then reverse the whole array, the first k items and the rest (three reversals). Time O(n), space O(1).\n\nPython solution (the same logic works in C, C++ and Java):\ndef rotate(a, k):\n    n = len(a)\n    k %= n\n    def rev(i, j):\n        while i < j:\n            a[i], a[j] = a[j], a[i]\n            i += 1; j -= 1\n    rev(0, n - 1); rev(0, k - 1); rev(k, n - 1)\n    return a",
     "s": 0
    },
    {
     "q": "Merge two sorted arrays into one sorted array.",
     "a": "Use two pointers and always take the smaller front element. Time O(n + m).\n\nPython solution (the same logic works in C, C++ and Java):\ndef merge(a, b):\n    i = j = 0\n    out = []\n    while i < len(a) and j < len(b):\n        if a[i] <= b[j]:\n            out.append(a[i]); i += 1\n        else:\n            out.append(b[j]); j += 1\n    return out + a[i:] + b[j:]",
     "s": 0
    }
   ]
  }
 ],
 "hcl": [
  {
   "name": "Practice: Quantitative aptitude",
   "practice": true,
   "note": "Practice questions written in the style of the HCL aptitude test (quantitative, logical, verbal) and the technical coding interview. They are not reported papers; use them to build speed with formulas and shortcuts.",
   "questions": [
    {
     "q": "What is the unit digit of 3^2025?",
     "a": "3. Unit digits of powers of 3 repeat as 3, 9, 7, 1. 2025 mod 4 = 1, so the unit digit is 3.",
     "s": 0
    },
    {
     "q": "What is the sum of the first 20 odd natural numbers?",
     "a": "400. The sum of the first n odd numbers is n^2 = 20^2 = 400.",
     "s": 0
    },
    {
     "q": "A and B invest Rs 6,000 and Rs 9,000 for the whole year. The profit is Rs 7,500. What is A's share?",
     "a": "Rs 3,000. The ratio is 6000:9000 = 2:3, so A gets 2/5 x 7500 = 3000.",
     "s": 0
    },
    {
     "q": "A student scores 45% and fails by 15 marks. The pass mark is 50%. Find the maximum marks.",
     "a": "300. The 5% gap equals 15 marks, so 1% = 3 marks and the total = 300.",
     "s": 0
    },
    {
     "q": "A man sells an article at a 10% loss. If he sold it for Rs 60 more, he would gain 5%. Find the cost price.",
     "a": "Rs 400. The difference between -10% and +5% is 15% of CP = 60, so CP = 400.",
     "s": 0
    }
   ]
  },
  {
   "name": "Practice: Logical reasoning",
   "practice": true,
   "note": "Practice questions written in the style of the HCL aptitude test (quantitative, logical, verbal) and the technical coding interview. They are not reported papers; draw the diagram or table first, then answer.",
   "questions": [
    {
     "q": "A clock shows 3:15. What is the angle between the hands?",
     "a": "7.5 degrees. Hour hand = 90 + 7.5 = 97.5 degrees, minute hand = 90 degrees, so the angle is 7.5 degrees.",
     "s": 0
    },
    {
     "q": "Complete the series: 4, 9, 16, 25, 36, ?",
     "a": "49. These are the squares of 2, 3, 4, 5, 6, so the next is 7^2 = 49.",
     "s": 0
    },
    {
     "q": "Mohan is 7th from the left end and 12th from the right end of a row. How many people are in the row?",
     "a": "18. Total = 7 + 12 - 1 = 18.",
     "s": 0
    },
    {
     "q": "If TAKE is written as UBLF (each letter moved one step forward), how is MAKE written?",
     "a": "NBLF. Move every letter one step forward in the alphabet.",
     "s": 0
    }
   ]
  },
  {
   "name": "Practice: Verbal ability and communication",
   "practice": true,
   "note": "Practice questions written in the style of the HCL aptitude test (quantitative, logical, verbal) and the technical coding interview. They are not reported papers; read each option fully before choosing.",
   "questions": [
    {
     "q": "Read and answer. Passage: \"Regular sleep helps the brain store what it learned during the day. Students who sleep well after studying usually recall more.\" What is the main idea?",
     "a": "Good sleep improves memory and learning. The passage links sleep after studying with better recall.",
     "s": 0
    },
    {
     "q": "Read and answer. Passage: \"The company moved to remote work in 2020. Productivity stayed the same, but employees reported feeling less connected to colleagues.\" Which statement is supported by the passage?",
     "a": "Remote work did not reduce productivity but weakened the sense of connection. The other claims go beyond what the passage states.",
     "s": 0
    },
    {
     "q": "Spoken English practice: Introduce yourself in four sentences.",
     "a": "Sample: \"Good morning. My name is Anil and I am a final-year B.Tech student in Computer Science. I enjoy solving problems in Python and I built a small project on attendance tracking. I am looking forward to learning and growing in this company.\" Keep it clear, short and honest.",
     "s": 0
    },
    {
     "q": "Choose the correct sentence: (a) He don't like tea. (b) He doesn't like tea. (c) He not like tea. (d) He didn't likes tea.",
     "a": "(b) He doesn't like tea. With he/she/it use 'doesn't' plus the base form of the verb.",
     "s": 0
    }
   ]
  },
  {
   "name": "Practice: Coding",
   "practice": true,
   "note": "Practice questions written in the style of the HCL aptitude test (quantitative, logical, verbal) and the technical coding interview. They are not reported papers; write each solution yourself before reading the answer.",
   "questions": [
    {
     "q": "Implement binary search on a sorted array.",
     "a": "Compare with the middle element and discard half each time. Time O(log n). In C or Java use mid = lo + (hi - lo) / 2 to avoid overflow.\n\nPython solution (the same logic works in C, C++ and Java):\ndef bsearch(a, x):\n    lo, hi = 0, len(a) - 1\n    while lo <= hi:\n        mid = (lo + hi) // 2\n        if a[mid] == x: return mid\n        if a[mid] < x: lo = mid + 1\n        else: hi = mid - 1\n    return -1",
     "s": 0
    },
    {
     "q": "Sort an array of 0s, 1s and 2s in one pass.",
     "a": "Dutch national flag: keep low, mid and high pointers; swap 0 to the front and 2 to the back. Time O(n), space O(1).\n\nPython solution (the same logic works in C, C++ and Java):\ndef sort012(a):\n    lo, mid, hi = 0, 0, len(a) - 1\n    while mid <= hi:\n        if a[mid] == 0:\n            a[lo], a[mid] = a[mid], a[lo]; lo += 1; mid += 1\n        elif a[mid] == 1:\n            mid += 1\n        else:\n            a[mid], a[hi] = a[hi], a[mid]; hi -= 1\n    return a",
     "s": 0
    },
    {
     "q": "Reverse a singly linked list.",
     "a": "Walk the list and flip each next pointer, keeping prev and cur. Time O(n), space O(1).\n\nPython solution (the same logic works in C, C++ and Java):\nclass Node:\n    def __init__(self, v, nxt=None):\n        self.v, self.next = v, nxt\ndef reverse_list(head):\n    prev = None\n    while head:\n        nxt = head.next\n        head.next = prev\n        prev, head = head, nxt\n    return prev",
     "s": 0
    }
   ]
  }
 ],
 "amazon": [
  {
   "name": "Practice: Quantitative aptitude",
   "practice": true,
   "note": "Practice questions written in the style of the Amazon online assessment (logical reasoning, coding) and the coding interviews. They are not reported papers; use them to build speed with formulas and shortcuts.",
   "questions": [
    {
     "q": "The circumference of a circle is 44 cm. Find its area (use pi = 22/7).",
     "a": "154 sq cm. 2 x (22/7) x r = 44 gives r = 7. Area = (22/7) x 49 = 154.",
     "s": 0
    },
    {
     "q": "The length of a rectangle is increased by 20% and the breadth is decreased by 10%. What is the change in area?",
     "a": "8% increase. 1.2 x 0.9 = 1.08.",
     "s": 0
    },
    {
     "q": "Two trains of length 100 m and 120 m run in opposite directions at 40 km/h and 50 km/h. How long to cross each other?",
     "a": "8.8 seconds. Relative speed = 90 km/h = 25 m/s. Distance = 220 m. Time = 220/25 = 8.8 s.",
     "s": 0
    }
   ]
  },
  {
   "name": "Practice: Logical reasoning",
   "practice": true,
   "note": "Practice questions written in the style of the Amazon online assessment (logical reasoning, coding) and the coding interviews. They are not reported papers; draw the diagram or table first, then answer.",
   "questions": [
    {
     "q": "If CAT is coded as 3-1-20 (alphabet positions), how is DOG coded?",
     "a": "4-15-7. D = 4, O = 15, G = 7.",
     "s": 0
    },
    {
     "q": "Statements: All cats are animals. Some animals are dogs. Conclusion: Some cats are dogs. Does the conclusion follow?",
     "a": "No. The animals that are dogs may not include any cat. Draw it as circles: cats sit inside animals, and dogs only overlap animals somewhere else.",
     "s": 0
    },
    {
     "q": "2 : 8 :: 3 : 27 :: 4 : ?",
     "a": "64. The pattern is n to n^3.",
     "s": 0
    },
    {
     "q": "A is twice as old as B. Five years ago A was three times as old as B. How old is A now?",
     "a": "20 years. Let B = x. 2x - 5 = 3(x - 5), so x = 10 and A = 20.",
     "s": 0
    },
    {
     "q": "A person facing north turns 90 degrees right and then 135 degrees left. Which direction is he facing now?",
     "a": "North-west. Right turn from north gives east. Turning 135 degrees left (anticlockwise) from east gives north-west.",
     "s": 0
    }
   ]
  },
  {
   "name": "Practice: Verbal ability and communication",
   "practice": true,
   "note": "Practice questions written in the style of the Amazon online assessment (logical reasoning, coding) and the coding interviews. They are not reported papers; read each option fully before choosing.",
   "questions": [
    {
     "q": "Fill in the blank: The teacher, along with her students, ___ going on a trip. (is / are / were / have)",
     "a": "is. The subject is 'teacher'; 'along with her students' does not change the verb.",
     "s": 0
    },
    {
     "q": "Spot the error: \"The information are very useful for us.\"",
     "a": "\"The information is very useful for us.\" 'Information' is uncountable and takes a singular verb.",
     "s": 0
    }
   ]
  },
  {
   "name": "Practice: Coding",
   "practice": true,
   "note": "Practice questions written in the style of the Amazon online assessment (logical reasoning, coding) and the coding interviews. They are not reported papers; write each solution yourself before reading the answer.",
   "questions": [
    {
     "q": "Detect a cycle in a linked list.",
     "a": "Floyd's tortoise and hare: move one pointer by 1 and another by 2. If they meet there is a cycle. Time O(n), space O(1).\n\nPython solution (the same logic works in C, C++ and Java):\ndef has_cycle(head):\n    slow = fast = head\n    while fast and fast.next:\n        slow, fast = slow.next, fast.next.next\n        if slow is fast:\n            return True\n    return False",
     "s": 0
    },
    {
     "q": "Find the length of the longest substring without repeating characters.",
     "a": "Sliding window with a map of the last seen index of each character. Time O(n).\n\nPython solution (the same logic works in C, C++ and Java):\ndef longest(s):\n    last, start, best = {}, 0, 0\n    for i, c in enumerate(s):\n        if c in last and last[c] >= start:\n            start = last[c] + 1\n        last[c] = i\n        best = max(best, i - start + 1)\n    return best",
     "s": 0
    },
    {
     "q": "Merge overlapping intervals.",
     "a": "Sort by start, then extend the last merged interval while the next one starts inside it. Time O(n log n).\n\nPython solution (the same logic works in C, C++ and Java):\ndef merge_intervals(iv):\n    out = []\n    for s, e in sorted(iv):\n        if out and s <= out[-1][1]:\n            out[-1][1] = max(out[-1][1], e)\n        else:\n            out.append([s, e])\n    return out",
     "s": 0
    },
    {
     "q": "Compute how much rain water is trapped between bars of given heights.",
     "a": "Two pointers: move the side with the smaller height and add (best height so far on that side) - (current height). Time O(n), space O(1).\n\nPython solution (the same logic works in C, C++ and Java):\ndef trap(h):\n    lo, hi, lm, rm, total = 0, len(h) - 1, 0, 0, 0\n    while lo < hi:\n        if h[lo] < h[hi]:\n            lm = max(lm, h[lo]); total += lm - h[lo]; lo += 1\n        else:\n            rm = max(rm, h[hi]); total += rm - h[hi]; hi -= 1\n    return total",
     "s": 0
    },
    {
     "q": "Given an array and a target, return the indices of two numbers that add up to the target.",
     "a": "Store each number's index in a hash map and look up target - x as you go. Time O(n), space O(n).\n\nPython solution (the same logic works in C, C++ and Java):\ndef two_sum(a, target):\n    seen = {}\n    for i, x in enumerate(a):\n        if target - x in seen:\n            return seen[target - x], i\n        seen[x] = i",
     "s": 0
    },
    {
     "q": "Find the product of all elements except self without using division.",
     "a": "Build prefix products going left to right and multiply by suffix products going right to left. Time O(n), space O(1) extra.\n\nPython solution (the same logic works in C, C++ and Java):\ndef product_except_self(a):\n    n = len(a)\n    out = [1] * n\n    p = 1\n    for i in range(n):\n        out[i] = p; p *= a[i]\n    s = 1\n    for i in range(n - 1, -1, -1):\n        out[i] *= s; s *= a[i]\n    return out",
     "s": 0
    }
   ]
  }
 ],
 "microsoft": [
  {
   "name": "Practice: Quantitative aptitude",
   "practice": true,
   "note": "Practice questions written in the style of the Microsoft online assessment and the data structures and algorithms interviews. They are not reported papers; use them to build speed with formulas and shortcuts.",
   "questions": [
    {
     "q": "A card is drawn from a pack of 52. What is the probability of getting a king or a heart?",
     "a": "4/13. Hearts 13 + kings 4 - king of hearts 1 = 16 cards. 16/52 = 4/13.",
     "s": 0
    },
    {
     "q": "How many numbers from 1 to 100 are divisible by 3 or 5?",
     "a": "47. Multiples of 3 = 33, of 5 = 20, of 15 = 6. By inclusion-exclusion: 33 + 20 - 6 = 47.",
     "s": 0
    },
    {
     "q": "Find the simple interest on Rs 8,000 at 5% per annum for 3 years.",
     "a": "Rs 1,200. SI = P x R x T / 100 = 8000 x 5 x 3 / 100 = 1200.",
     "s": 0
    }
   ]
  },
  {
   "name": "Practice: Logical reasoning",
   "practice": true,
   "note": "Practice questions written in the style of the Microsoft online assessment and the data structures and algorithms interviews. They are not reported papers; draw the diagram or table first, then answer.",
   "questions": [
    {
     "q": "Find the next letter: A, C, F, J, O, ?",
     "a": "U. The gaps are +2, +3, +4, +5, so the next gap is +6: O (15) + 6 = 21 = U.",
     "s": 0
    },
    {
     "q": "Find the odd one out: 8, 27, 64, 100, 125",
     "a": "100. All the others are perfect cubes (2^3, 3^3, 4^3, 5^3).",
     "s": 0
    },
    {
     "q": "A cube of side 3 cm is painted on all faces and cut into 27 small cubes of 1 cm. How many small cubes have exactly two painted faces?",
     "a": "12. These are the edge cubes (not corners): 12 edges x 1 middle cube each = 12.",
     "s": 0
    }
   ]
  },
  {
   "name": "Practice: Verbal ability and communication",
   "practice": true,
   "note": "Practice questions written in the style of the Microsoft online assessment and the data structures and algorithms interviews. They are not reported papers; read each option fully before choosing.",
   "questions": [
    {
     "q": "Choose the word that best completes: He was so ___ that he finished the whole project in one night. (diligent / lazy / careless / doubtful)",
     "a": "diligent. It means hard-working, which fits finishing the project in one night.",
     "s": 0
    },
    {
     "q": "Choose the synonym of METICULOUS: careless / careful and precise / lazy / angry",
     "a": "Careful and precise. A meticulous person pays great attention to detail.",
     "s": 0
    }
   ]
  },
  {
   "name": "Practice: Coding",
   "practice": true,
   "note": "Practice questions written in the style of the Microsoft online assessment and the data structures and algorithms interviews. They are not reported papers; write each solution yourself before reading the answer.",
   "questions": [
    {
     "q": "Reverse a singly linked list.",
     "a": "Walk the list and flip each next pointer, keeping prev and cur. Time O(n), space O(1).\n\nPython solution (the same logic works in C, C++ and Java):\nclass Node:\n    def __init__(self, v, nxt=None):\n        self.v, self.next = v, nxt\ndef reverse_list(head):\n    prev = None\n    while head:\n        nxt = head.next\n        head.next = prev\n        prev, head = head, nxt\n    return prev",
     "s": 0
    },
    {
     "q": "Design an LRU cache with O(1) get and put.",
     "a": "Use a hash map plus a doubly linked list (or Python's OrderedDict). On every access move the key to the most recent end; when full remove the least recent one.\n\nPython solution (the same logic works in C, C++ and Java):\nfrom collections import OrderedDict\nclass LRU:\n    def __init__(self, cap):\n        self.cap, self.d = cap, OrderedDict()\n    def get(self, k):\n        if k not in self.d: return -1\n        self.d.move_to_end(k)\n        return self.d[k]\n    def put(self, k, v):\n        self.d[k] = v\n        self.d.move_to_end(k)\n        if len(self.d) > self.cap:\n            self.d.popitem(last=False)",
     "s": 0
    },
    {
     "q": "Count the number of islands in a grid of 0s and 1s.",
     "a": "Scan the grid; on every unvisited 1 start a DFS or BFS that marks the whole island, and add one to the count. Time O(r x c).\n\nPython solution (the same logic works in C, C++ and Java):\ndef islands(g):\n    g = [list(r) for r in g]\n    R, C, n = len(g), len(g[0]), 0\n    def dfs(i, j):\n        if 0 <= i < R and 0 <= j < C and g[i][j] == '1':\n            g[i][j] = '0'\n            dfs(i+1, j); dfs(i-1, j); dfs(i, j+1); dfs(i, j-1)\n    for i in range(R):\n        for j in range(C):\n            if g[i][j] == '1':\n                n += 1; dfs(i, j)\n    return n",
     "s": 0
    },
    {
     "q": "Find the length of the longest increasing subsequence.",
     "a": "Keep a sorted list of the smallest tail for each length and use binary search to place every number. Time O(n log n).\n\nPython solution (the same logic works in C, C++ and Java):\nfrom bisect import bisect_left\ndef lis(a):\n    tails = []\n    for x in a:\n        i = bisect_left(tails, x)\n        if i == len(tails): tails.append(x)\n        else: tails[i] = x\n    return len(tails)",
     "s": 0
    },
    {
     "q": "Rotate an array to the right by k positions.",
     "a": "Use k = k % n, then reverse the whole array, the first k items and the rest (three reversals). Time O(n), space O(1).\n\nPython solution (the same logic works in C, C++ and Java):\ndef rotate(a, k):\n    n = len(a)\n    k %= n\n    def rev(i, j):\n        while i < j:\n            a[i], a[j] = a[j], a[i]\n            i += 1; j -= 1\n    rev(0, n - 1); rev(0, k - 1); rev(k, n - 1)\n    return a",
     "s": 0
    },
    {
     "q": "Check whether a string of brackets ()[]{} is valid.",
     "a": "Push opening brackets on a stack; on a closing bracket the stack top must be its partner. At the end the stack must be empty. Time O(n).\n\nPython solution (the same logic works in C, C++ and Java):\ndef valid(s):\n    pair = {')': '(', ']': '[', '}': '{'}\n    st = []\n    for c in s:\n        if c in '([{':\n            st.append(c)\n        elif not st or st.pop() != pair[c]:\n            return False\n    return not st",
     "s": 0
    }
   ]
  }
 ],
 "google": [
  {
   "name": "Practice: Quantitative aptitude",
   "practice": true,
   "note": "Practice questions written in the style of the Google technical interviews, which test problem solving rather than fixed aptitude papers. They are not reported papers; use them to build speed with formulas and shortcuts.",
   "questions": [
    {
     "q": "Find the compound interest on Rs 5,000 at 10% per annum for 2 years (compounded yearly).",
     "a": "Rs 1,050. Amount = 5000 x 1.1 x 1.1 = 6050, so CI = 6050 - 5000 = 1050.",
     "s": 0
    },
    {
     "q": "Two fair dice are thrown. What is the probability that the sum is 8?",
     "a": "5/36. Favourable outcomes: (2,6), (3,5), (4,4), (5,3), (6,2) = 5 out of 36.",
     "s": 0
    }
   ]
  },
  {
   "name": "Practice: Logical reasoning",
   "practice": true,
   "note": "Practice questions written in the style of the Google technical interviews, which test problem solving rather than fixed aptitude papers. They are not reported papers; draw the diagram or table first, then answer.",
   "questions": [
    {
     "q": "A man walks 5 km north, turns right and walks 3 km, turns right again and walks 5 km. How far is he from the start?",
     "a": "3 km. After the two right turns he is walking south, so he comes back level with the start, 3 km to the east.",
     "s": 0
    },
    {
     "q": "If the 5th of a month is a Monday, what day is the 25th?",
     "a": "Sunday. 25 - 5 = 20 days later. 20 mod 7 = 6, and Monday + 6 days = Sunday.",
     "s": 0
    },
    {
     "q": "A says \"B is a liar\". B says \"A and I are both liars\". Who is telling the truth?",
     "a": "A tells the truth and B is lying. If B were truthful, his statement would make him a liar, which is a contradiction. So B lies, which makes A's statement true.",
     "s": 0
    },
    {
     "q": "Find the next number: 1, 1, 2, 3, 5, 8, ?",
     "a": "13. Each number is the sum of the previous two (Fibonacci).",
     "s": 0
    }
   ]
  },
  {
   "name": "Practice: Verbal ability and communication",
   "practice": true,
   "note": "Practice questions written in the style of the Google technical interviews, which test problem solving rather than fixed aptitude papers. They are not reported papers; read each option fully before choosing.",
   "questions": [
    {
     "q": "Choose the antonym of BENEVOLENT: kind / generous / malevolent / helpful",
     "a": "Malevolent. Benevolent means well-meaning and kind; malevolent means wishing harm.",
     "s": 0
    }
   ]
  },
  {
   "name": "Practice: Coding",
   "practice": true,
   "note": "Practice questions written in the style of the Google technical interviews, which test problem solving rather than fixed aptitude papers. They are not reported papers; write each solution yourself before reading the answer.",
   "questions": [
    {
     "q": "Compute how much rain water is trapped between bars of given heights.",
     "a": "Two pointers: move the side with the smaller height and add (best height so far on that side) - (current height). Time O(n), space O(1).\n\nPython solution (the same logic works in C, C++ and Java):\ndef trap(h):\n    lo, hi, lm, rm, total = 0, len(h) - 1, 0, 0, 0\n    while lo < hi:\n        if h[lo] < h[hi]:\n            lm = max(lm, h[lo]); total += lm - h[lo]; lo += 1\n        else:\n            rm = max(rm, h[hi]); total += rm - h[hi]; hi -= 1\n    return total",
     "s": 0
    },
    {
     "q": "Design an LRU cache with O(1) get and put.",
     "a": "Use a hash map plus a doubly linked list (or Python's OrderedDict). On every access move the key to the most recent end; when full remove the least recent one.\n\nPython solution (the same logic works in C, C++ and Java):\nfrom collections import OrderedDict\nclass LRU:\n    def __init__(self, cap):\n        self.cap, self.d = cap, OrderedDict()\n    def get(self, k):\n        if k not in self.d: return -1\n        self.d.move_to_end(k)\n        return self.d[k]\n    def put(self, k, v):\n        self.d[k] = v\n        self.d.move_to_end(k)\n        if len(self.d) > self.cap:\n            self.d.popitem(last=False)",
     "s": 0
    },
    {
     "q": "Count the number of islands in a grid of 0s and 1s.",
     "a": "Scan the grid; on every unvisited 1 start a DFS or BFS that marks the whole island, and add one to the count. Time O(r x c).\n\nPython solution (the same logic works in C, C++ and Java):\ndef islands(g):\n    g = [list(r) for r in g]\n    R, C, n = len(g), len(g[0]), 0\n    def dfs(i, j):\n        if 0 <= i < R and 0 <= j < C and g[i][j] == '1':\n            g[i][j] = '0'\n            dfs(i+1, j); dfs(i-1, j); dfs(i, j+1); dfs(i, j-1)\n    for i in range(R):\n        for j in range(C):\n            if g[i][j] == '1':\n                n += 1; dfs(i, j)\n    return n",
     "s": 0
    },
    {
     "q": "Find the length of the longest increasing subsequence.",
     "a": "Keep a sorted list of the smallest tail for each length and use binary search to place every number. Time O(n log n).\n\nPython solution (the same logic works in C, C++ and Java):\nfrom bisect import bisect_left\ndef lis(a):\n    tails = []\n    for x in a:\n        i = bisect_left(tails, x)\n        if i == len(tails): tails.append(x)\n        else: tails[i] = x\n    return len(tails)",
     "s": 0
    },
    {
     "q": "Return the k most frequent elements of an array.",
     "a": "Count with a hash map, then take the k largest counts with a heap or by sorting. Time O(n log k) with a heap.\n\nPython solution (the same logic works in C, C++ and Java):\nfrom collections import Counter\nimport heapq\ndef top_k(a, k):\n    c = Counter(a)\n    return [x for x, _ in heapq.nlargest(k, c.items(), key=lambda t: t[1])]",
     "s": 0
    },
    {
     "q": "Find the product of all elements except self without using division.",
     "a": "Build prefix products going left to right and multiply by suffix products going right to left. Time O(n), space O(1) extra.\n\nPython solution (the same logic works in C, C++ and Java):\ndef product_except_self(a):\n    n = len(a)\n    out = [1] * n\n    p = 1\n    for i in range(n):\n        out[i] = p; p *= a[i]\n    s = 1\n    for i in range(n - 1, -1, -1):\n        out[i] *= s; s *= a[i]\n    return out",
     "s": 0
    },
    {
     "q": "Find the length of the longest substring without repeating characters.",
     "a": "Sliding window with a map of the last seen index of each character. Time O(n).\n\nPython solution (the same logic works in C, C++ and Java):\ndef longest(s):\n    last, start, best = {}, 0, 0\n    for i, c in enumerate(s):\n        if c in last and last[c] >= start:\n            start = last[c] + 1\n        last[c] = i\n        best = max(best, i - start + 1)\n    return best",
     "s": 0
    }
   ]
  }
 ]
};
