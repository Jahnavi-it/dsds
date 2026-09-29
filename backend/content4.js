const T = (title, notes) => ({ title, notes });

const aptitude = [
  T('Percentages', ['x% of y = x x y / 100. Percentage change = (change / original) x 100.', 'Successive changes: a 20% rise then a 10% fall is not a 10% rise; multiply 1.2 x 0.9 = 1.08, so 8% up.', 'Shortcut: 10% of a number is just moving the decimal one place left.']),
  T('Profit and Loss', ['Profit = SP - CP; Profit% = profit / CP x 100 (always on cost price).', 'Selling price = CP x (100 + profit%) / 100. For a loss use (100 - loss%).', 'Discount is on marked price: SP = MP x (100 - discount%) / 100.']),
  T('Ratios and Averages', ['A ratio a:b divides a total T into a/(a+b) x T and b/(a+b) x T.', 'Average = sum / count. If a new value is added, new sum = old sum + value.', 'Weighted mix: (q1 x p1 + q2 x p2) / (q1 + q2).']),
  T('Time, Speed and Distance', ['Distance = speed x time. Convert km/h to m/s by multiplying by 5/18.', 'Average speed for equal distances at speeds a and b = 2ab / (a + b).', 'Train crossing a pole: length = speed x time. Crossing a platform: add the platform length.']),
  T('Time and Work', ['If A takes a days and B takes b days, together they take ab / (a + b) days.', 'Work rate = 1 / days. Add rates for people working together.', 'Pipes: a filling pipe adds its rate, an emptying pipe subtracts it.']),
  T('Simple and Compound Interest', ['SI = P x R x T / 100. Amount = P + SI.', 'Compound amount = P x (1 + R/100)^T; CI = amount - P.', 'For 2 years, CI - SI = P x (R/100)^2.']),
  T('Numbers, HCF and LCM', ['HCF is the greatest common factor; LCM is the smallest common multiple; HCF x LCM = product of the two numbers.', 'Divisibility: by 3 if the digit sum is divisible by 3; by 9 if digit sum is divisible by 9; by 4 if the last two digits are.', 'Unit digits repeat in cycles, for example powers of 7 give 7, 9, 3, 1.']),
  T('Permutation, Combination and Probability', ['nPr = n! / (n - r)! (order matters); nCr = n! / (r! (n - r)!) (order does not matter).', 'Probability = favourable outcomes / total outcomes, always between 0 and 1.', 'Two dice: 36 outcomes; sum 7 has 6 outcomes, so probability 1/6.'])
];

const reasoning = [
  T('Number and Letter Series', ['Check differences first, then ratios, then squares or cubes.', 'Second-level differences (3, 5, 7, 9...) mean the series is quadratic.', 'For letters, convert to positions (A=1 ... Z=26) and look for a pattern.']),
  T('Coding-Decoding', ['Most questions shift each letter by a fixed number, or reverse the alphabet (A<->Z).', 'Write positions under the letters and compare word and code.', 'Number codes: find what each symbol maps to using the given examples.']),
  T('Blood Relations', ['Draw a small family tree; use + for male and - for female.', 'Maternal uncle = mother brother; paternal aunt = father sister; cousin = child of uncle or aunt.', 'Solve the statement one link at a time from the person named first.']),
  T('Directions and Distances', ['Draw a coordinate sketch: North up, East right.', 'Opposite moves cancel out (5 km north then 5 km south = 0).', 'Use Pythagoras for the shortest distance: sqrt(a^2 + b^2).']),
  T('Ranking and Order', ['Total = rank from top + rank from bottom - 1.', 'Rank from the other end = total - rank + 1.', 'For sitting in a row, write positions 1 to n and place each clue.']),
  T('Syllogisms', ['Draw Venn diagrams for All, Some and No statements.', 'A conclusion is true only if it is true in every possible diagram.', '"Some A are B" also means "Some B are A", but "All A are B" does not mean "All B are A".']),
  T('Seating and Puzzles', ['Start with the most definite clue (fixed position or extreme end).', 'Use a table with names against attributes and tick off options.', 'Circular arrangement: fix one person and arrange the rest relative to them.'])
];

const verbal = [
  T('Tenses', ['Simple present for habits and facts, present continuous for actions now, present perfect for actions with a present result.', '"Since" is used with a point in time and "for" with a period of time.', 'Future perfect (will have + past participle) shows an action finished before a future time.']),
  T('Subject-Verb Agreement', ['A singular subject takes a singular verb: Each of the students has finished.', '"Neither ... nor" and "either ... or": the verb agrees with the nearer subject.', 'Uncountable nouns such as furniture, advice and information take a singular verb.']),
  T('Articles and Prepositions', ['Use "a" before a consonant sound and "an" before a vowel sound (a university, an hour).', 'Common fixed pairs: good at, afraid of, interested in, depend on, different from.', 'At is for exact points, on for surfaces and days, in for larger spaces and periods.']),
  T('Synonyms and Antonyms', ['Learn words in pairs: ample = plenty, rapid = quick, generous vs stingy, ancient vs modern.', 'Read the sentence first; the context often shows whether the word is positive or negative.', 'Beware of look-alike options that are actually opposite in meaning.']),
  T('Active, Passive and Reported Speech', ['Passive = object + be + past participle + by + subject.', 'In reported speech the tense usually moves one step back (am becomes was, will becomes would).', 'Pronouns and time words change too: I becomes he or she, today becomes that day.']),
  T('Sentence Correction and Ordering', ['Check subject-verb agreement, tense and pronoun first.', 'For ordering, find the opening sentence, then link pronouns and connectors (then, however, therefore).', 'The correct order should read like a natural story or argument.']),
  T('Reading Comprehension', ['Read the questions first, then read the passage looking for the answers.', 'The main idea covers the whole passage; a detail question is answered in one place.', 'Eliminate options that are too extreme or not mentioned in the passage.'])
];

module.exports = [
  { id: 'aptitude', icon: '🧮', topics: aptitude },
  { id: 'reasoning', icon: '🧩', topics: reasoning },
  { id: 'verbal', icon: '🗣️', topics: verbal }
];