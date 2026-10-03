const F = (q, kw, a) => ({ q, kw, a });
const T = (keys, qs) => ({ types: ['tech'], keys, qs });
const H = (keys, qs) => ({ types: ['hr'], keys, qs });

module.exports = {
  tcs: [
    T(['project', 'database'], [F('How did you design the database tables for your project, and what relationships did you use?', ['table', 'primary', 'foreign', 'relationship', 'normal'], 'Explain the entities, primary keys, foreign keys and one-to-many relationships, and say how you avoided redundancy.'), F('What testing did you do on your final-year project?', ['test', 'bug', 'unit', 'case', 'fix'], 'Describe test cases, bugs found and how you fixed them.')]),
    H(['relocat', 'location'], [F('What if you are posted to a location you did not choose?', ['adapt', 'accept', 'learn', 'flexible', 'ready'], 'Say you will adapt, see it as a learning chance, and discuss any genuine concern politely.')])
  ],
  infosys: [
    T(['java', 'oop', 'class'], [F('Where would you use an interface instead of an abstract class?', ['interface', 'multiple', 'contract', 'abstract', 'implement'], 'Use an interface for a contract many unrelated classes implement, and for multiple inheritance of type.'), F('Explain exception handling in a real example from your project.', ['try', 'catch', 'finally', 'error', 'example'], 'Describe a try-catch around file or database access, and cleanup in finally.')]),
    H(['learn', 'training'], [F('How will you manage learning during the Infosys training programme?', ['plan', 'practice', 'time', 'assignment', 'revise'], 'Say you will plan daily study, practise assignments and revise weak topics.')])
  ],
  wipro: [
    T(['project', 'c', 'pointer'], [F('How do you avoid memory leaks and dangling pointers in C?', ['free', 'null', 'malloc', 'pointer', 'leak'], 'Free every malloc once, set pointers to NULL after free, and never use freed memory.'), F('How do you debug a segmentation fault?', ['pointer', 'debug', 'array', 'null', 'gdb'], 'Check invalid pointers and array bounds, use a debugger or print statements, and find the failing line.')]),
    H(['shift', 'flexible'], [F('How do you manage your health and work-life balance in shift work?', ['sleep', 'routine', 'balance', 'health', 'plan'], 'Keep a sleep routine, plan your time and set boundaries.')])
  ],
  accenture: [
    T(['cloud', 'agile', 'api'], [F('Which cloud service did you use and for what?', ['aws', 'azure', 'storage', 'deploy', 'service'], 'Name one service, e.g. AWS S3 for storage or Azure App Service for hosting, and what you did.'), F('How do you handle changing requirements in Agile?', ['sprint', 'backlog', 'client', 'change', 'priorit'], 'Add changes to the backlog, prioritize with the product owner and deliver in the next sprint.')]),
    H(['team', 'client'], [F('How would you handle an unhappy client?', ['listen', 'understand', 'solution', 'communicat', 'apolog'], 'Listen, acknowledge, find the cause, offer a solution and keep communicating.')])
  ],
  cognizant: [
    T(['java', 'sql', 'web'], [F('How would you connect a Java or web application to a database?', ['jdbc', 'connection', 'query', 'driver', 'api'], 'Use a driver such as JDBC, open a connection, run prepared statements and close resources.'), F('What is the difference between GET and POST?', ['get', 'post', 'url', 'body', 'secure'], 'GET sends data in the URL and is for reading. POST sends data in the body and is for creating or updating.')]),
    H(['client', 'customer'], [F('Tell me about a time you went the extra mile for someone.', ['extra', 'help', 'result', 'situation', 'example'], 'Use STAR with a real example and its result.')])
  ],
  capgemini: [
    T(['project', 'test', 'cloud'], [F('What is the difference between black box and white box testing?', ['black', 'white', 'code', 'input', 'output'], 'Black box tests inputs and outputs without code knowledge. White box tests internal code paths.'), F('What is version control and why do teams use it?', ['git', 'branch', 'merge', 'history', 'team'], 'Version control tracks changes, supports branching and merging, and lets teams work together safely.')]),
    H(['team', 'teamwork'], [F('What role do you usually take in a team?', ['role', 'lead', 'support', 'example', 'communicat'], 'Name your usual role, such as coordinator or developer, and give an example.')])
  ],
  amazon: [
    T(['hash', 'map', 'array'], [F('What happens when two keys hash to the same bucket, and how do you handle it?', ['collision', 'chain', 'probing', 'bucket', 'resize'], 'Handle collisions with chaining (linked lists in a bucket) or open addressing (probing), and resize when the load factor is high.'), F('How would your solution change if the input did not fit in memory?', ['disk', 'chunk', 'external', 'stream', 'sort'], 'Process in chunks, use external sort or streaming, or distribute the work across machines.')]),
    H(['customer', 'ownership', 'deadline'], [F('What was the measurable result of that, and what would you do differently?', ['result', 'metric', 'percent', 'differently', 'learn'], 'Give a number such as time saved or users helped, and one real improvement.')])
  ],
  microsoft: [
    T(['linked', 'tree', 'class'], [F('What edge cases would you test for your solution?', ['empty', 'null', 'single', 'duplicate', 'large'], 'Test empty input, null, a single element, duplicates and very large input.'), F('How would you make your code easier to maintain and test?', ['function', 'modular', 'test', 'naming', 'comment'], 'Keep functions small, use clear names, add unit tests and avoid duplication.')]),
    H(['learn', 'growth', 'feedback'], [F('How do you seek feedback proactively?', ['ask', 'review', 'mentor', 'improve', 'apply'], 'Ask mentors and peers for reviews regularly and show what you changed.')])
  ],
  google: [
    T(['binary', 'search', 'graph', 'sort'], [F('Can you improve the time or space complexity of your solution?', ['optimi', 'space', 'time', 'heap', 'hash'], 'Look for a better data structure such as a hash map or heap, or trade space for time.'), F('How would your approach scale to billions of inputs?', ['distribut', 'shard', 'parallel', 'map', 'partition'], 'Partition the data, process in parallel with a map-reduce style approach and merge the results.')]),
    H(['impact', 'learn', 'team'], [F('How did you measure the success of that work?', ['metric', 'users', 'result', 'data', 'impact'], 'Name a metric, such as usage or time saved, and how you tracked it.')])
  ],
  zoho: [
    T(['loop', 'program', 'array', 'string'], [F('Can you write this without extra memory?', ['in place', 'pointer', 'swap', 'space', 'loop'], 'Use two pointers and swap in place so the extra space is O(1).'), F('What test cases would you try for your program?', ['empty', 'single', 'negative', 'large', 'edge'], 'Try empty input, a single element, negative values, very large input and other edge cases.')]),
    H(['learn', 'build', 'project'], [F('What was the hardest bug in something you built, and how did you fix it?', ['bug', 'debug', 'cause', 'fix', 'learn'], 'Describe the bug, how you traced its cause, the fix and what you learned.')])
  ]
};
