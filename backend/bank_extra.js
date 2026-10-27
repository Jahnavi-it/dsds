// Extra practice MCQs used only by the company-pattern mock tests (pseudocode, extra verbal, MS Office, cloud and security, code debugging).
// Pseudocode answers were computed by running equivalent code, so they are verified.
module.exports = [
 {
  "cat": "pseudocode",
  "question": "What is the output of the following pseudocode?\n\ns = 0\nfor i = 1 to 5\n    s = s + i\nend for\nprint s",
  "options": [
   "14",
   "17",
   "16",
   "15"
  ],
  "answer": 3,
  "explanation": "Output: 15. s = 1 + 2 + 3 + 4 + 5."
 },
 {
  "cat": "pseudocode",
  "question": "What is the output of the following pseudocode?\n\ns = 0\nfor i = 1 to 10\n    if i mod 2 == 0\n        s = s + i\nend for\nprint s",
  "options": [
   "30",
   "32",
   "29",
   "31"
  ],
  "answer": 0,
  "explanation": "Output: 30. Even numbers 2 + 4 + 6 + 8 + 10."
 },
 {
  "cat": "pseudocode",
  "question": "What is the output of the following pseudocode?\n\nr = 1\nfor i = 1 to 5\n    r = r * i\nend for\nprint r",
  "options": [
   "120",
   "121",
   "119",
   "122"
  ],
  "answer": 0,
  "explanation": "Output: 120. 5! = 5 x 4 x 3 x 2 x 1."
 },
 {
  "cat": "pseudocode",
  "question": "What is the output of the following pseudocode?\n\nn = 4821\nc = 0\nwhile n > 0\n    n = n / 10      (integer division)\n    c = c + 1\nend while\nprint c",
  "options": [
   "6",
   "3",
   "4",
   "5"
  ],
  "answer": 2,
  "explanation": "Output: 4. The loop runs once per digit."
 },
 {
  "cat": "pseudocode",
  "question": "What is the output of the following pseudocode?\n\nn = 123\nr = 0\nwhile n > 0\n    r = r * 10 + (n mod 10)\n    n = n / 10      (integer division)\nend while\nprint r",
  "options": [
   "320",
   "323",
   "322",
   "321"
  ],
  "answer": 3,
  "explanation": "Output: 321. r becomes 3, then 32, then 321."
 },
 {
  "cat": "pseudocode",
  "question": "What is the output of the following pseudocode?\n\nn = 4821\ns = 0\nwhile n > 0\n    s = s + (n mod 10)\n    n = n / 10      (integer division)\nend while\nprint s",
  "options": [
   "14",
   "16",
   "15",
   "17"
  ],
  "answer": 2,
  "explanation": "Output: 15. 1 + 2 + 8 + 4."
 },
 {
  "cat": "pseudocode",
  "question": "What is the output of the following pseudocode?\n\na = 0\nb = 1\nrepeat 6 times\n    t = a + b\n    a = b\n    b = t\nend repeat\nprint a",
  "options": [
   "10",
   "9",
   "8",
   "7"
  ],
  "answer": 2,
  "explanation": "Output: 8. a takes the values 1, 1, 2, 3, 5, 8."
 },
 {
  "cat": "pseudocode",
  "question": "What is the output of the following pseudocode?\n\na = 48\nb = 18\nwhile b != 0\n    t = a mod b\n    a = b\n    b = t\nend while\nprint a",
  "options": [
   "6",
   "8",
   "7",
   "5"
  ],
  "answer": 0,
  "explanation": "Output: 6. (48,18) -> (18,12) -> (12,6) -> (6,0)."
 },
 {
  "cat": "pseudocode",
  "question": "What is the output of the following pseudocode?\n\nr = 1\nfor i = 1 to 4\n    r = r * 3\nend for\nprint r",
  "options": [
   "82",
   "81",
   "80",
   "83"
  ],
  "answer": 1,
  "explanation": "Output: 81. 3 multiplied four times = 81."
 },
 {
  "cat": "pseudocode",
  "question": "What is the output of the following pseudocode?\n\nc = 0\nfor i = 1 to 3\n    for j = 1 to i\n        c = c + 1\n    end for\nend for\nprint c",
  "options": [
   "8",
   "7",
   "6",
   "5"
  ],
  "answer": 2,
  "explanation": "Output: 6. Inner loop runs 1 + 2 + 3 times."
 },
 {
  "cat": "pseudocode",
  "question": "What is the output of the following pseudocode?\n\ns = 0\nfor i = 1 to 4\n    for j = 1 to 4\n        if i == j\n            s = s + i\n    end for\nend for\nprint s",
  "options": [
   "12",
   "10",
   "11",
   "9"
  ],
  "answer": 1,
  "explanation": "Output: 10. Only i = j counts: 1 + 2 + 3 + 4."
 },
 {
  "cat": "pseudocode",
  "question": "What is the output of the following pseudocode?\n\nA = [3, 8, 2, 9, 4]\nm = A[0]\nfor each x in A\n    if x > m\n        m = x\nend for\nprint m",
  "options": [
   "11",
   "10",
   "9",
   "8"
  ],
  "answer": 2,
  "explanation": "Output: 9. m keeps the largest value seen."
 },
 {
  "cat": "pseudocode",
  "question": "What is the output of the following pseudocode?\n\nA = [5, 1, 7, 3, 9, 2]      (index starts at 0)\ns = 0\nfor i = 0 to 5\n    if i mod 2 == 1\n        s = s + A[i]\nend for\nprint s",
  "options": [
   "6",
   "8",
   "7",
   "5"
  ],
  "answer": 0,
  "explanation": "Output: 6. Indexes 1, 3, 5 hold 1, 3, 2."
 },
 {
  "cat": "pseudocode",
  "question": "What is the output of the following pseudocode?\n\nA = [3, 8, 2, 9, 4, 6]\nc = 0\nfor each x in A\n    if x > 4\n        c = c + 1\nend for\nprint c",
  "options": [
   "5",
   "2",
   "4",
   "3"
  ],
  "answer": 3,
  "explanation": "Output: 3. Values 8, 9, 6 are greater than 4."
 },
 {
  "cat": "pseudocode",
  "question": "What is the output of the following pseudocode?\n\nprint (12 AND 10) + (12 OR 10)      (bitwise)",
  "options": [
   "24",
   "21",
   "23",
   "22"
  ],
  "answer": 3,
  "explanation": "Output: 22. 1100 AND 1010 = 1000 (8); 1100 OR 1010 = 1110 (14); 8 + 14."
 },
 {
  "cat": "pseudocode",
  "question": "What is the output of the following pseudocode?\n\nx = 5\nx = x << 2      (shift left by 2 bits)\nprint x",
  "options": [
   "20",
   "21",
   "19",
   "22"
  ],
  "answer": 0,
  "explanation": "Output: 20. Shifting left by 2 multiplies by 4."
 },
 {
  "cat": "pseudocode",
  "question": "What is the output of the following pseudocode?\n\nfunction f(n)\n    if n == 0 return 1\n    return f(n - 1) * 2\nend function\nprint f(5)",
  "options": [
   "32",
   "33",
   "31",
   "34"
  ],
  "answer": 0,
  "explanation": "Output: 32. f(n) doubles each step, so f(5) = 2^5."
 },
 {
  "cat": "pseudocode",
  "question": "What is the output of the following pseudocode?\n\nfunction f(n)\n    if n < 2 return n\n    return f(n - 1) + f(n - 2)\nend function\nprint f(7)",
  "options": [
   "14",
   "15",
   "12",
   "13"
  ],
  "answer": 3,
  "explanation": "Output: 13. Fibonacci: 0, 1, 1, 2, 3, 5, 8, 13."
 },
 {
  "cat": "pseudocode",
  "question": "What is the output of the following pseudocode?\n\ns = \"EDUCATION\"\nc = 0\nfor each ch in s\n    if ch is a vowel (A, E, I, O, U)\n        c = c + 1\nend for\nprint c",
  "options": [
   "7",
   "4",
   "5",
   "6"
  ],
  "answer": 2,
  "explanation": "Output: 5. E, U, A, I, O are vowels."
 },
 {
  "cat": "pseudocode",
  "question": "What is the output of the following pseudocode?\n\ns = 0\nfor i = 1 to 10\n    if i mod 4 == 0\n        break\n    s = s + i\nend for\nprint s",
  "options": [
   "5",
   "6",
   "7",
   "8"
  ],
  "answer": 1,
  "explanation": "Output: 6. Loop stops at i = 4, so s = 1 + 2 + 3."
 },
 {
  "cat": "pseudocode",
  "question": "What is the output of the following pseudocode?\n\ns = 0\nfor i = 1 to 6\n    if i mod 2 == 0\n        continue\n    s = s + i\nend for\nprint s",
  "options": [
   "10",
   "8",
   "9",
   "11"
  ],
  "answer": 2,
  "explanation": "Output: 9. Only odd i is added: 1 + 3 + 5."
 },
 {
  "cat": "pseudocode",
  "question": "What is the output of the following pseudocode?\n\nx = 1\ndo\n    x = x * 2\nwhile x < 50\nprint x",
  "options": [
   "64",
   "65",
   "63",
   "66"
  ],
  "answer": 0,
  "explanation": "Output: 64. x = 2, 4, 8, 16, 32, 64 and the loop stops when x >= 50."
 },
 {
  "cat": "pseudocode",
  "question": "What is the output of the following pseudocode?\n\na = 7\nif a > 10\n    print 1\nelse if a > 5\n    print 2\nelse\n    print 3",
  "options": [
   "2",
   "3",
   "4",
   "1"
  ],
  "answer": 0,
  "explanation": "Output: 2. a > 10 is false, a > 5 is true."
 },
 {
  "cat": "pseudocode",
  "question": "What is the output of the following pseudocode?\n\na = 4\nb = 9\nt = a\na = b\nb = t\nprint a - b",
  "options": [
   "5",
   "6",
   "7",
   "4"
  ],
  "answer": 0,
  "explanation": "Output: 5. After the swap a = 9 and b = 4."
 },
 {
  "cat": "pseudocode",
  "question": "What is the output of the following pseudocode?\n\na = 2\nb = 3\na = a + b\nb = a - b\na = a - b\nprint a, b",
  "options": [
   "5 2",
   "3 2",
   "2 3",
   "3 5"
  ],
  "answer": 1,
  "explanation": "Output: 3 2. This swaps the two values without a temporary variable."
 },
 {
  "cat": "pseudocode",
  "question": "What is the output of the following pseudocode?\n\nprint (17 mod 5) * (17 / 5)      (integer division)",
  "options": [
   "8",
   "6",
   "7",
   "5"
  ],
  "answer": 1,
  "explanation": "Output: 6. 17 mod 5 = 2 and 17 / 5 = 3."
 },
 {
  "cat": "pseudocode",
  "question": "What is the output of the following pseudocode?\n\nc = 0\ni = 20\nwhile i > 0\n    c = c + 1\n    i = i - 6\nend while\nprint c",
  "options": [
   "3",
   "5",
   "6",
   "4"
  ],
  "answer": 3,
  "explanation": "Output: 4. i = 20, 14, 8, 2 (then -4 stops)."
 },
 {
  "cat": "pseudocode",
  "question": "What is the output of the following pseudocode?\n\ni = 1\ns = 0\nwhile i < 20\n    s = s + i\n    i = i * 2\nend while\nprint s",
  "options": [
   "30",
   "31",
   "32",
   "33"
  ],
  "answer": 1,
  "explanation": "Output: 31. 1 + 2 + 4 + 8 + 16."
 },
 {
  "cat": "pseudocode",
  "question": "What is the output of the following pseudocode?\n\nA = [1, 2, 3, 4]      (index starts at 0)\nfor i = 0 to 2\n    A[i + 1] = A[i] + A[i + 1]\nend for\nprint A[3]",
  "options": [
   "10",
   "11",
   "12",
   "9"
  ],
  "answer": 0,
  "explanation": "Output: 10. A becomes [1, 3, 6, 10]."
 },
 {
  "cat": "pseudocode",
  "question": "What is the output of the following pseudocode?\n\nfunction f(x)\n    return x * x + 1\nend function\nprint f(f(2))",
  "options": [
   "26",
   "27",
   "25",
   "28"
  ],
  "answer": 0,
  "explanation": "Output: 26. f(2) = 5 and f(5) = 26."
 },
 {
  "cat": "pseudocode",
  "question": "What is the output of the following pseudocode?\n\nn = 29\nresult = \"Prime\"\nfor i = 2 to 5\n    if n mod i == 0\n        result = \"Not prime\"\nend for\nprint result",
  "options": [
   "Not prime",
   "Prime",
   "29",
   "Error"
  ],
  "answer": 1,
  "explanation": "Output: Prime. 29 is not divisible by 2, 3, 4 or 5."
 },
 {
  "cat": "pseudocode",
  "question": "What is the output of the following pseudocode?\n\nn = 12\nc = 0\nfor i = 1 to 12\n    if n mod i == 0\n        c = c + 1\nend for\nprint c",
  "options": [
   "6",
   "8",
   "7",
   "5"
  ],
  "answer": 0,
  "explanation": "Output: 6. Divisors of 12: 1, 2, 3, 4, 6, 12."
 },
 {
  "cat": "pseudocode",
  "question": "What is the output of the following pseudocode?\n\nx = 100\nwhile x > 10\n    x = x / 3      (integer division)\nend while\nprint x",
  "options": [
   "5",
   "2",
   "4",
   "3"
  ],
  "answer": 3,
  "explanation": "Output: 3. 100 -> 33 -> 11 -> 3."
 },
 {
  "cat": "pseudocode",
  "question": "What is the output of the following pseudocode?\n\nA = [4, 3, 2, 1]\nfor i = 0 to 2\n    if A[i] > A[i + 1]\n        swap A[i], A[i + 1]\nend for\nprint A[0]",
  "options": [
   "2",
   "4",
   "3",
   "5"
  ],
  "answer": 2,
  "explanation": "Output: 3. One bubble pass moves 4 to the end: [3, 2, 1, 4]."
 },
 {
  "cat": "pseudocode",
  "question": "What is the output of the following pseudocode?\n\na = 12\nb = 7\nc = 15\nif a > b\n    if a > c print a else print c\nelse\n    if b > c print b else print c",
  "options": [
   "14",
   "16",
   "15",
   "17"
  ],
  "answer": 2,
  "explanation": "Output: 15. a > b is true, then 12 > 15 is false, so c is printed."
 },
 {
  "cat": "pseudocode",
  "question": "What is the output of the following pseudocode?\n\ns = 0\nfor i = 1 to 4\n    s = s + i * i\nend for\nprint s",
  "options": [
   "29",
   "30",
   "31",
   "32"
  ],
  "answer": 1,
  "explanation": "Output: 30. 1 + 4 + 9 + 16."
 },
 {
  "cat": "pseudocode",
  "question": "What is the output of the following pseudocode?\n\nc = 0\nfor i = 1 to 20\n    if i mod 3 == 0 AND i mod 5 == 0\n        c = c + 1\nend for\nprint c",
  "options": [
   "1",
   "3",
   "0",
   "2"
  ],
  "answer": 0,
  "explanation": "Output: 1. Only 15 is divisible by both 3 and 5."
 },
 {
  "cat": "pseudocode",
  "question": "What is the output of the following pseudocode?\n\nx = 9\ns = 0\nwhile x > 0\n    s = s + x\n    x = x - 2\nend while\nprint s",
  "options": [
   "24",
   "25",
   "27",
   "26"
  ],
  "answer": 1,
  "explanation": "Output: 25. 9 + 7 + 5 + 3 + 1."
 },
 {
  "cat": "pseudocode",
  "question": "What is the output of the following pseudocode?\n\nn = 1000\nc = 0\nwhile n > 1\n    n = n / 2      (integer division)\n    c = c + 1\nend while\nprint c",
  "options": [
   "8",
   "10",
   "11",
   "9"
  ],
  "answer": 3,
  "explanation": "Output: 9. 1000 -> 500 -> 250 -> 125 -> 62 -> 31 -> 15 -> 7 -> 3 -> 1 (9 steps)."
 },
 {
  "cat": "pseudocode",
  "question": "What is the output of the following pseudocode?\n\nn = 13\nout = \"\"\nwhile n > 0\n    out = out + (n mod 2)\n    n = n / 2      (integer division)\nend while\nprint out",
  "options": [
   "1101",
   "0111",
   "1110",
   "1011"
  ],
  "answer": 3,
  "explanation": "Output: 1011. Remainders are written from the last bit first: 1, 0, 1, 1."
 },
 {
  "cat": "pseudocode",
  "question": "What is the output of the following pseudocode?\n\ns = \"HELLO\"\nprint s reversed",
  "options": [
   "LLEHO",
   "OLLHE",
   "OLLEH",
   "HELLO"
  ],
  "answer": 2,
  "explanation": "Output: OLLEH. Characters are read from the end."
 },
 {
  "cat": "pseudocode",
  "question": "What is the output of the following pseudocode?\n\ns = \"COMPUTER\"\nprint s[3]      (index starts at 0)",
  "options": [
   "P",
   "M",
   "O",
   "U"
  ],
  "answer": 0,
  "explanation": "Output: P. Index 0 = C, 1 = O, 2 = M, 3 = P."
 },
 {
  "cat": "pseudocode",
  "question": "What is the output of the following pseudocode?\n\ns = \"PLACEMENT\"\nprint length of s",
  "options": [
   "8",
   "11",
   "9",
   "10"
  ],
  "answer": 2,
  "explanation": "Output: 9. P-L-A-C-E-M-E-N-T has 9 letters."
 },
 {
  "cat": "pseudocode",
  "question": "What is the output of the following pseudocode?\n\ns = \"MADAM\"\nif s equals reverse of s\n    print \"Palindrome\"\nelse\n    print \"Not palindrome\"",
  "options": [
   "Not palindrome",
   "Palindrome",
   "MADAM",
   "Error"
  ],
  "answer": 1,
  "explanation": "Output: Palindrome. MADAM reads the same from both ends."
 },
 {
  "cat": "verbal",
  "question": "Neither of the two boys ___ present in the class.",
  "options": [
   "have been",
   "were",
   "are",
   "was"
  ],
  "answer": 3,
  "explanation": "'Neither' is singular, so it takes a singular verb."
 },
 {
  "cat": "verbal",
  "question": "She has been working here ___ 2019.",
  "options": [
   "by",
   "from",
   "for",
   "since"
  ],
  "answer": 3,
  "explanation": "'Since' is used with a point in time; 'for' is used with a period."
 },
 {
  "cat": "verbal",
  "question": "He is senior ___ me by three years.",
  "options": [
   "over",
   "than",
   "to",
   "from"
  ],
  "answer": 2,
  "explanation": "'Senior' is followed by 'to'."
 },
 {
  "cat": "verbal",
  "question": "I look forward ___ you soon.",
  "options": [
   "in seeing",
   "to see",
   "for seeing",
   "to seeing"
  ],
  "answer": 3,
  "explanation": "'Look forward to' is followed by a gerund (-ing form)."
 },
 {
  "cat": "verbal",
  "question": "Each of the students ___ given a certificate.",
  "options": [
   "have",
   "was",
   "were",
   "are"
  ],
  "answer": 1,
  "explanation": "'Each' is singular."
 },
 {
  "cat": "verbal",
  "question": "If I ___ you, I would accept the offer.",
  "options": [
   "were",
   "be",
   "am",
   "was"
  ],
  "answer": 0,
  "explanation": "The subjunctive mood uses 'were' for an unreal condition."
 },
 {
  "cat": "verbal",
  "question": "The news ___ very shocking.",
  "options": [
   "are",
   "is",
   "have been",
   "were"
  ],
  "answer": 1,
  "explanation": "'News' is an uncountable noun and takes a singular verb."
 },
 {
  "cat": "verbal",
  "question": "She prefers tea ___ coffee.",
  "options": [
   "over",
   "to",
   "from",
   "than"
  ],
  "answer": 1,
  "explanation": "'Prefer' is followed by 'to'."
 },
 {
  "cat": "verbal",
  "question": "He did not come ___ he was ill.",
  "options": [
   "although",
   "unless",
   "because",
   "so"
  ],
  "answer": 2,
  "explanation": "The sentence gives a reason, so 'because' fits."
 },
 {
  "cat": "verbal",
  "question": "By the time we reached the station, the train ___.",
  "options": [
   "leaves",
   "had left",
   "left",
   "has left"
  ],
  "answer": 1,
  "explanation": "Past perfect shows the earlier of two past actions."
 },
 {
  "cat": "verbal",
  "question": "Choose the correct spelling of the word meaning 'to be given something'.",
  "options": [
   "Recieve",
   "Receve",
   "Receeve",
   "Receive"
  ],
  "answer": 3,
  "explanation": "Remember 'i before e except after c'."
 },
 {
  "cat": "verbal",
  "question": "Choose the correct spelling of the word meaning 'a place to stay'.",
  "options": [
   "Acommodation",
   "Accommodation",
   "Acomodation",
   "Accomodation"
  ],
  "answer": 1,
  "explanation": "The word has double c and double m."
 },
 {
  "cat": "verbal",
  "question": "Choose the correct spelling of the word meaning 'an event or incident'.",
  "options": [
   "Occurrence",
   "Occurrance",
   "Occurence",
   "Ocurrence"
  ],
  "answer": 0,
  "explanation": "The word has double c and double r."
 },
 {
  "cat": "verbal",
  "question": "One word for 'a person who walks in sleep':",
  "options": [
   "Insomniac",
   "Hypnotist",
   "Somnambulist",
   "Narcoleptic"
  ],
  "answer": 2,
  "explanation": "A somnambulist is a sleepwalker."
 },
 {
  "cat": "verbal",
  "question": "One word for 'a person who knows many languages':",
  "options": [
   "Orator",
   "Polyglot",
   "Pedant",
   "Bilingual"
  ],
  "answer": 1,
  "explanation": "A polyglot speaks several languages."
 },
 {
  "cat": "verbal",
  "question": "One word for 'the study of birds':",
  "options": [
   "Ethnology",
   "Ornithology",
   "Etymology",
   "Entomology"
  ],
  "answer": 1,
  "explanation": "Entomology is insects and etymology is word origins."
 },
 {
  "cat": "verbal",
  "question": "Choose the word closest in meaning to ABUNDANT.",
  "options": [
   "Plentiful",
   "Scarce",
   "Rare",
   "Tiny"
  ],
  "answer": 0,
  "explanation": "Abundant means available in large quantity."
 },
 {
  "cat": "verbal",
  "question": "Choose the word closest in meaning to CANDID.",
  "options": [
   "Frank",
   "Shy",
   "Rude",
   "Secretive"
  ],
  "answer": 0,
  "explanation": "Candid means honest and direct."
 },
 {
  "cat": "verbal",
  "question": "Choose the word closest in meaning to DILIGENT.",
  "options": [
   "Hardworking",
   "Lazy",
   "Careless",
   "Slow"
  ],
  "answer": 0,
  "explanation": "Diligent means careful and hardworking."
 },
 {
  "cat": "verbal",
  "question": "Choose the word closest in meaning to BRIEF.",
  "options": [
   "Long",
   "Wide",
   "Short",
   "Heavy"
  ],
  "answer": 2,
  "explanation": "Brief means short in time or length."
 },
 {
  "cat": "verbal",
  "question": "Choose the opposite of EXPAND.",
  "options": [
   "Grow",
   "Spread",
   "Extend",
   "Contract"
  ],
  "answer": 3,
  "explanation": "To contract is to become smaller."
 },
 {
  "cat": "verbal",
  "question": "Choose the opposite of OPTIMISTIC.",
  "options": [
   "Positive",
   "Hopeful",
   "Pessimistic",
   "Cheerful"
  ],
  "answer": 2,
  "explanation": "A pessimist expects the worst."
 },
 {
  "cat": "verbal",
  "question": "Choose the opposite of TRANSPARENT.",
  "options": [
   "Opaque",
   "Clear",
   "Bright",
   "Thin"
  ],
  "answer": 0,
  "explanation": "Opaque means not allowing light through."
 },
 {
  "cat": "verbal",
  "question": "Choose the opposite of GENEROUS.",
  "options": [
   "Polite",
   "Kind",
   "Rich",
   "Miserly"
  ],
  "answer": 3,
  "explanation": "A miserly person hates spending or giving."
 },
 {
  "cat": "verbal",
  "question": "What does the idiom 'break the ice' mean?",
  "options": [
   "Become angry",
   "Break something cold",
   "Leave early",
   "Start a conversation in an awkward situation"
  ],
  "answer": 3,
  "explanation": "It means to ease tension at the start of a meeting."
 },
 {
  "cat": "verbal",
  "question": "What does 'once in a blue moon' mean?",
  "options": [
   "At night",
   "Every month",
   "Very often",
   "Very rarely"
  ],
  "answer": 3,
  "explanation": "It describes something that happens very seldom."
 },
 {
  "cat": "verbal",
  "question": "What does 'a piece of cake' mean?",
  "options": [
   "Sweet",
   "Very easy",
   "A small dessert",
   "Very costly"
  ],
  "answer": 1,
  "explanation": "It describes a task that is very easy."
 },
 {
  "cat": "verbal",
  "question": "What does 'hit the nail on the head' mean?",
  "options": [
   "Work very hard",
   "Make a mistake",
   "Cause an injury",
   "Say exactly the right thing"
  ],
  "answer": 3,
  "explanation": "It means to be exactly right about something."
 },
 {
  "cat": "verbal",
  "question": "What does 'burn the midnight oil' mean?",
  "options": [
   "Waste fuel",
   "Sleep early",
   "Start a fire",
   "Work late into the night"
  ],
  "answer": 3,
  "explanation": "It means to study or work late at night."
 },
 {
  "cat": "verbal",
  "question": "Choose the grammatically correct sentence.",
  "options": [
   "He did not likes coffee.",
   "He not like coffee.",
   "He do not like coffee.",
   "He does not like coffee."
  ],
  "answer": 3,
  "explanation": "With 'he' the auxiliary is 'does' and the main verb stays in the base form."
 },
 {
  "cat": "verbal",
  "question": "Choose the passive form of: The chef cooked the meal.",
  "options": [
   "The chef was cooked by the meal.",
   "The meal has cooked by the chef.",
   "The meal is cooked by the chef.",
   "The meal was cooked by the chef."
  ],
  "answer": 3,
  "explanation": "Simple past active becomes 'was/were + past participle'."
 },
 {
  "cat": "verbal",
  "question": "Choose the passive form of: They are building a bridge.",
  "options": [
   "A bridge was built by them.",
   "A bridge is built by them.",
   "A bridge has been built by them.",
   "A bridge is being built by them."
  ],
  "answer": 3,
  "explanation": "Present continuous passive is 'is/are being + past participle'."
 },
 {
  "cat": "verbal",
  "question": "Change to indirect speech: He said, \"I am tired.\"",
  "options": [
   "He said that he is tired.",
   "He said that he has been tired.",
   "He said that he was tired.",
   "He said that I was tired."
  ],
  "answer": 2,
  "explanation": "In reported speech the present tense moves back to the past."
 },
 {
  "cat": "verbal",
  "question": "Change to indirect speech: She said, \"I will call you tomorrow.\"",
  "options": [
   "She said that I would call her the next day.",
   "She said that she would call you tomorrow.",
   "She said that she would call me the next day.",
   "She said that she will call you tomorrow."
  ],
  "answer": 2,
  "explanation": "'Will' becomes 'would', 'you' becomes 'me' and 'tomorrow' becomes 'the next day'."
 },
 {
  "cat": "verbal",
  "question": "He is ___ honest man.",
  "options": [
   "an",
   "the",
   "no article",
   "a"
  ],
  "answer": 0,
  "explanation": "'Honest' starts with a vowel sound, so 'an' is used."
 },
 {
  "cat": "verbal",
  "question": "___ Sun rises in the east.",
  "options": [
   "A",
   "An",
   "The",
   "No article"
  ],
  "answer": 2,
  "explanation": "'The' is used with unique things like the Sun."
 },
 {
  "cat": "verbal",
  "question": "The cat jumped ___ the table.",
  "options": [
   "onto",
   "into",
   "upto",
   "unto"
  ],
  "answer": 0,
  "explanation": "'Onto' shows movement to a surface."
 },
 {
  "cat": "verbal",
  "question": "She is good ___ mathematics.",
  "options": [
   "with",
   "on",
   "at",
   "in"
  ],
  "answer": 2,
  "explanation": "'Good at' is the correct preposition."
 },
 {
  "cat": "verbal",
  "question": "He is afraid ___ snakes.",
  "options": [
   "from",
   "of",
   "at",
   "with"
  ],
  "answer": 1,
  "explanation": "'Afraid of' is the correct phrase."
 },
 {
  "cat": "verbal",
  "question": "She ___ to the market yesterday.",
  "options": [
   "has gone",
   "go",
   "goes",
   "went"
  ],
  "answer": 3,
  "explanation": "'Yesterday' needs the simple past tense."
 },
 {
  "cat": "verbal",
  "question": "The teacher, along with the students, ___ going on a trip.",
  "options": [
   "have",
   "were",
   "is",
   "are"
  ],
  "answer": 2,
  "explanation": "The subject is 'teacher'; 'along with the students' does not change the verb."
 },
 {
  "cat": "verbal",
  "question": "Either Ravi or his friends ___ responsible.",
  "options": [
   "are",
   "was",
   "has",
   "is"
  ],
  "answer": 0,
  "explanation": "With 'either...or' the verb agrees with the nearer subject, 'friends'."
 },
 {
  "cat": "verbal",
  "question": "Despite the heavy rain, the match ___.",
  "options": [
   "was cold",
   "got worse",
   "was cancelled",
   "went ahead"
  ],
  "answer": 3,
  "explanation": "'Despite' shows contrast, so the match continued."
 },
 {
  "cat": "verbal",
  "question": "He worked hard; ___, he failed the exam.",
  "options": [
   "moreover",
   "because",
   "however",
   "therefore"
  ],
  "answer": 2,
  "explanation": "'However' shows contrast between the two ideas."
 },
 {
  "cat": "verbal",
  "question": "She was tired ___ she went to bed early.",
  "options": [
   "although",
   "unless",
   "so",
   "but"
  ],
  "answer": 2,
  "explanation": "'So' shows the result."
 },
 {
  "cat": "verbal",
  "question": "Which sentence uses 'neither...nor' correctly?",
  "options": [
   "Neither he nor I be going.",
   "Neither he nor I is going.",
   "Neither he nor I are going.",
   "Neither he nor I am going."
  ],
  "answer": 3,
  "explanation": "With 'neither...nor' the verb agrees with the nearer subject, 'I'."
 },
 {
  "cat": "verbal",
  "question": "Arrange the sentences: P. He opened the door. Q. He heard a knock. R. He found a courier boy. S. He was reading a book.",
  "options": [
   "SQPR",
   "PQRS",
   "QSPR",
   "SPQR"
  ],
  "answer": 0,
  "explanation": "He was reading, heard a knock, opened the door and found a courier boy."
 },
 {
  "cat": "verbal",
  "question": "The weather will ___ my plans.",
  "options": [
   "afect",
   "effect",
   "affect",
   "effects"
  ],
  "answer": 2,
  "explanation": "'Affect' is the verb; 'effect' is usually the noun."
 },
 {
  "cat": "verbal",
  "question": "Her advice had a great ___ on me.",
  "options": [
   "effet",
   "effect",
   "affect",
   "afect"
  ],
  "answer": 1,
  "explanation": "'Effect' is the noun meaning result."
 },
 {
  "cat": "verbal",
  "question": "Please ___ the form before Friday.",
  "options": [
   "compete",
   "complement",
   "compliment",
   "complete"
  ],
  "answer": 3,
  "explanation": "'Complete' means to finish filling in the form."
 },
 {
  "cat": "verbal",
  "question": "Which sentence is correct?",
  "options": [
   "She has less friends.",
   "She has lesser friends.",
   "She has fewer friends.",
   "She has little friends."
  ],
  "answer": 2,
  "explanation": "'Fewer' is used with countable nouns."
 },
 {
  "cat": "office",
  "question": "Which Excel function adds the numbers in a range?",
  "options": [
   "SUM",
   "ADD",
   "TOTAL",
   "PLUS"
  ],
  "answer": 0,
  "explanation": "=SUM(A1:A5) adds the values."
 },
 {
  "cat": "office",
  "question": "Every formula in Excel must begin with:",
  "options": [
   "=",
   "$",
   "#",
   "@"
  ],
  "answer": 0,
  "explanation": "A formula starts with the equals sign."
 },
 {
  "cat": "office",
  "question": "Which shortcut copies the selected text?",
  "options": [
   "Ctrl+X",
   "Ctrl+P",
   "Ctrl+V",
   "Ctrl+C"
  ],
  "answer": 3,
  "explanation": "Ctrl+V pastes and Ctrl+X cuts."
 },
 {
  "cat": "office",
  "question": "Which shortcut undoes the last action?",
  "options": [
   "Ctrl+U",
   "Ctrl+A",
   "Ctrl+Z",
   "Ctrl+Y"
  ],
  "answer": 2,
  "explanation": "Ctrl+Y redoes the action."
 },
 {
  "cat": "office",
  "question": "Which Excel function returns the largest value in a range?",
  "options": [
   "BIG",
   "TOP",
   "UPPER",
   "MAX"
  ],
  "answer": 3,
  "explanation": "=MAX(A1:A10)."
 },
 {
  "cat": "office",
  "question": "The default file extension of a Word document (Word 2007 and later) is:",
  "options": [
   ".doc",
   ".word",
   ".txt",
   ".docx"
  ],
  "answer": 3,
  "explanation": "Newer versions save in the .docx format."
 },
 {
  "cat": "office",
  "question": "Which PowerPoint feature controls how one slide moves to the next?",
  "options": [
   "Layout",
   "Transition",
   "Theme",
   "Animation"
  ],
  "answer": 1,
  "explanation": "Animations apply to objects on a slide."
 },
 {
  "cat": "office",
  "question": "Which Excel function counts the cells that contain numbers?",
  "options": [
   "NUMBERS",
   "COUNTA",
   "COUNT",
   "SUMCOUNT"
  ],
  "answer": 2,
  "explanation": "COUNTA counts all non-empty cells."
 },
 {
  "cat": "office",
  "question": "In Word, which tab is used to insert a header or footer?",
  "options": [
   "Review",
   "Home",
   "View",
   "Insert"
  ],
  "answer": 3,
  "explanation": "Header and Footer are in the Insert tab."
 },
 {
  "cat": "office",
  "question": "Which key combination selects all content in a document?",
  "options": [
   "Ctrl+L",
   "Ctrl+Shift+A",
   "Ctrl+S",
   "Ctrl+A"
  ],
  "answer": 3,
  "explanation": "Ctrl+S saves the file."
 },
 {
  "cat": "office",
  "question": "VLOOKUP searches for the value in:",
  "options": [
   "Any row randomly",
   "The last column of the table",
   "The header row",
   "The first column of the table"
  ],
  "answer": 3,
  "explanation": "VLOOKUP looks in the first column and returns a value from a column to the right."
 },
 {
  "cat": "office",
  "question": "In Excel, the cell reference $A$1 is called:",
  "options": [
   "Absolute reference",
   "Mixed reference",
   "Circular reference",
   "Relative reference"
  ],
  "answer": 0,
  "explanation": "The $ signs fix both the column and the row."
 },
 {
  "cat": "office",
  "question": "Mail merge in Word is used to:",
  "options": [
   "Compress a document",
   "Translate a document",
   "Merge two documents into a table",
   "Send personalised copies of a document to many recipients"
  ],
  "answer": 3,
  "explanation": "It combines a letter with a list of names and details."
 },
 {
  "cat": "office",
  "question": "Which Excel feature summarises large data by dragging fields?",
  "options": [
   "Goal Seek",
   "Data validation",
   "Macro",
   "PivotTable"
  ],
  "answer": 3,
  "explanation": "A PivotTable groups and totals data quickly."
 },
 {
  "cat": "cloud",
  "question": "Which cloud model gives you virtual machines and storage that you manage yourself?",
  "options": [
   "PaaS",
   "DaaS",
   "IaaS",
   "SaaS"
  ],
  "answer": 2,
  "explanation": "Infrastructure as a Service, for example virtual machines."
 },
 {
  "cat": "cloud",
  "question": "Gmail is an example of:",
  "options": [
   "IaaS",
   "SaaS",
   "On-premise software",
   "PaaS"
  ],
  "answer": 1,
  "explanation": "The software is used over the internet without managing servers."
 },
 {
  "cat": "cloud",
  "question": "A firewall is used to:",
  "options": [
   "Speed up the internet",
   "Store backups",
   "Compress files",
   "Filter network traffic using security rules"
  ],
  "answer": 3,
  "explanation": "It allows or blocks traffic based on rules."
 },
 {
  "cat": "cloud",
  "question": "Phishing is:",
  "options": [
   "Speeding up a network",
   "Tricking people into revealing information through fake messages or sites",
   "A type of backup",
   "A programming language"
  ],
  "answer": 1,
  "explanation": "Never share passwords or OTPs through links in unknown messages."
 },
 {
  "cat": "cloud",
  "question": "HTTPS uses which port by default?",
  "options": [
   "443",
   "25",
   "21",
   "80"
  ],
  "answer": 0,
  "explanation": "HTTP uses 80, FTP 21 and SMTP 25."
 },
 {
  "cat": "cloud",
  "question": "Which statement about hashing and encryption is true?",
  "options": [
   "Hashing is one-way, encryption can be reversed with a key",
   "Encryption is always one-way",
   "Hashing needs a key to reverse",
   "Both are always reversible"
  ],
  "answer": 0,
  "explanation": "Passwords are stored as hashes, data in transit is encrypted."
 },
 {
  "cat": "cloud",
  "question": "Two-factor authentication means:",
  "options": [
   "Two users sharing an account",
   "Using two different proofs of identity, such as a password and an OTP",
   "Using two passwords",
   "Logging in twice"
  ],
  "answer": 1,
  "explanation": "The second factor is something you have or are."
 },
 {
  "cat": "cloud",
  "question": "Elasticity in cloud computing means:",
  "options": [
   "Resources scale up or down with demand",
   "Fixed capacity",
   "Free storage",
   "Hardware that bends"
  ],
  "answer": 0,
  "explanation": "You pay for what you use as demand changes."
 },
 {
  "cat": "cloud",
  "question": "A DDoS attack tries to:",
  "options": [
   "Steal passwords silently",
   "Make a service unavailable by flooding it with traffic",
   "Encrypt files for ransom",
   "Install a backup"
  ],
  "answer": 1,
  "explanation": "DDoS means distributed denial of service."
 },
 {
  "cat": "cloud",
  "question": "Which of these is a public cloud provider?",
  "options": [
   "Linux Kernel",
   "Amazon Web Services",
   "Python",
   "Oracle Java"
  ],
  "answer": 1,
  "explanation": "AWS, Microsoft Azure and Google Cloud are public clouds."
 },
 {
  "cat": "cloud",
  "question": "The principle of least privilege means:",
  "options": [
   "Users get only the access they need",
   "No logging is done",
   "Passwords are never changed",
   "Everyone gets admin access"
  ],
  "answer": 0,
  "explanation": "It limits the damage from mistakes or stolen accounts."
 },
 {
  "cat": "debug",
  "question": "Find the bug in this C code:\n\nint arr[5];\nfor (int i = 0; i <= 5; i++)\n    arr[i] = i;",
  "options": [
   "The loop writes past the end of the array (index 5)",
   "The variable i must be declared outside",
   "A semicolon is missing",
   "arr must be a float array"
  ],
  "answer": 0,
  "explanation": "Valid indexes are 0 to 4, so use i < 5."
 },
 {
  "cat": "debug",
  "question": "Find the bug:\n\nint x = 3;\nif (x = 5) {\n    printf(\"five\");\n}",
  "options": [
   "= assigns instead of comparing; use ==",
   "int cannot hold 5",
   "printf needs an &",
   "else is missing"
  ],
  "answer": 0,
  "explanation": "The condition assigns 5 to x, so it is always true."
 },
 {
  "cat": "debug",
  "question": "Java code:\n\nString a = new String(\"hi\");\nif (a == \"hi\") { ... }\n\nThe programmer wants to compare the text. What is wrong?",
  "options": [
   "== compares references; use a.equals(\"hi\")",
   "static is missing",
   "\"hi\" needs single quotes",
   "Strings cannot be compared in Java"
  ],
  "answer": 0,
  "explanation": "Use equals() to compare string content."
 },
 {
  "cat": "debug",
  "question": "C code:\n\nint sum = 7, n = 2;\nfloat avg = sum / n;\nprintf(\"%f\", avg);\n\nIt prints 3.000000 instead of 3.5. Why?",
  "options": [
   "n must be zero",
   "A return statement is missing",
   "Integer division drops the decimal part",
   "sum must be negative"
  ],
  "answer": 2,
  "explanation": "Cast one operand: (float) sum / n."
 },
 {
  "cat": "debug",
  "question": "C code:\n\nswitch (x) {\n  case 1: printf(\"A\");\n  case 2: printf(\"B\");\n}\n\nFor x = 1 it prints AB instead of only A. What is missing?",
  "options": [
   "break after each case",
   "A semicolon after case",
   "An else statement",
   "A default label only"
  ],
  "answer": 0,
  "explanation": "Without break the execution falls through to the next case."
 },
 {
  "cat": "debug",
  "question": "Java code:\n\nint[] a = new int[3];\na[3] = 10;\n\nWhat happens?",
  "options": [
   "ArrayIndexOutOfBoundsException, valid indexes are 0 to 2",
   "A compile-time error about int",
   "It stores 10 at the end",
   "The array grows automatically"
  ],
  "answer": 0,
  "explanation": "Index 3 is outside an array of length 3."
 },
 {
  "cat": "debug",
  "question": "C code:\n\nint i = 0;\nwhile (i < 10);\n{\n    i++;\n}\n\nWhy does this loop never end?",
  "options": [
   "10 is too large",
   "The semicolon after while makes an empty loop, so i never changes",
   "The braces are not allowed",
   "i is declared as float"
  ],
  "answer": 1,
  "explanation": "Remove the semicolon after the while condition."
 },
 {
  "cat": "debug",
  "question": "C code:\n\nint sq(int x) {\n    x * x;\n}\n\nWhat is the bug?",
  "options": [
   "x must be a pointer",
   "The function does not return a value",
   "The name sq is reserved",
   "int cannot be multiplied"
  ],
  "answer": 1,
  "explanation": "Use return x * x;"
 },
 {
  "cat": "debug",
  "question": "Java code:\n\nString s = null;\nSystem.out.println(s.length());\n\nWhat happens at run time?",
  "options": [
   "Compile-time error",
   "NullPointerException",
   "It prints 0",
   "It prints null"
  ],
  "answer": 1,
  "explanation": "Calling a method on a null reference throws NullPointerException."
 },
 {
  "cat": "debug",
  "question": "C code:\n\nint *p;\n*p = 10;\n\nWhat is wrong?",
  "options": [
   "A semicolon is missing",
   "p must be a float",
   "10 cannot be stored in an int",
   "The pointer is used without pointing to valid memory"
  ],
  "answer": 3,
  "explanation": "Assign p = &variable or allocate memory with malloc first."
 },
 {
  "cat": "debug",
  "question": "C code:\n\nchar name[5] = \"Hello\";\n\nWhat is the problem?",
  "options": [
   "No space for the terminating '\\0'; the array needs size 6",
   "char arrays cannot hold strings",
   "Hello must be in single quotes",
   "name must be an int"
  ],
  "answer": 0,
  "explanation": "A string of 5 letters needs 6 characters of space."
 }
];
