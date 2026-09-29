const B = (cat, question, options, answer, explanation) => ({ cat, question, options, answer, explanation });

module.exports = [
  B('os', 'What is a mutex mainly used for?', ['Allowing only one thread at a time into a critical section', 'Increasing CPU speed', 'Allocating disk blocks', 'Compressing files'], 0, 'A mutex is a lock that gives mutual exclusion over a shared resource.'),
  B('os', 'Turnaround time of a process is:', ['Time from submission to completion', 'Time spent only in the ready queue', 'Time spent only on the CPU', 'Time to create the process'], 0, 'Turnaround time = completion time - arrival time.'),
  B('os', 'Waiting time of a process is:', ['Total time spent in the ready queue', 'Total time spent executing', 'Time spent doing I/O only', 'Time to switch context'], 0, 'Waiting time = turnaround time - burst time (for CPU-only processes).'),
  B('os', 'When does a page fault occur?', ['When a required page is not in main memory', 'When the disk is full', 'When the CPU overheats', 'When a process ends'], 0, 'The OS must then load the page from disk into a free frame.'),
  B('os', 'Which memory allocation strategy chooses the smallest free hole that is big enough?', ['First fit', 'Best fit', 'Worst fit', 'Next fit'], 1, 'Best fit searches for the smallest sufficient hole.'),
  B('os', 'The Optimal page replacement algorithm replaces the page that:', ['Will not be used for the longest time in the future', 'Was used most recently', 'Came in first', 'Is the largest'], 0, 'It gives the fewest page faults but needs future knowledge, so it is used as a benchmark.'),
  B('os', 'What is the main job of a bootloader?', ['Load the operating system into memory when the computer starts', 'Schedule processes', 'Manage files', 'Compile programs'], 0, 'The bootloader starts the kernel after power on.'),
  B('os', 'A race condition happens when:', ['The result depends on the timing of threads accessing shared data', 'A process runs very fast', 'The CPU has many cores', 'A file is read twice'], 0, 'Unsynchronized access to shared data can give unpredictable results.'),
  B('os', 'Which disk scheduling algorithm serves the request closest to the current head position?', ['FCFS', 'SSTF', 'SCAN', 'C-LOOK'], 1, 'Shortest Seek Time First picks the nearest cylinder.'),
  B('os', 'Which is a benefit of multithreading in an application?', ['Better responsiveness, for example the UI stays active during background work', 'Less RAM is always used', 'No need for synchronization', 'Programs never crash'], 0, 'A program can do several tasks at the same time using threads.'),

  B('cn', 'Which OSI layer provides end-to-end delivery and uses port numbers?', ['Network', 'Transport', 'Session', 'Data Link'], 1, 'The Transport layer (TCP and UDP) uses ports to reach the right application.'),
  B('cn', 'What does the Physical layer of OSI transmit?', ['Packets', 'Frames', 'Raw bits', 'Messages'], 2, 'It sends bits as electrical, light or radio signals.'),
  B('cn', 'What is the data unit at the Data Link layer called?', ['Frame', 'Packet', 'Segment', 'Bit'], 0, 'The Data Link layer sends frames.'),
  B('cn', 'What is the data unit at the Network layer called?', ['Frame', 'Packet', 'Segment', 'Message'], 1, 'The Network layer handles packets (datagrams).'),
  B('cn', 'How many bits are there in an IPv6 address?', ['32', '64', '128', '256'], 2, 'IPv6 addresses are 128 bits long.'),
  B('cn', 'What is the default port number of DNS?', ['25', '53', '80', '110'], 1, 'DNS uses port 53.'),
  B('cn', 'What is the main purpose of a firewall?', ['Filter network traffic based on security rules', 'Speed up the internet', 'Assign IP addresses', 'Store web pages'], 0, 'A firewall allows or blocks traffic using rules.'),
  B('cn', 'The address 192.168.1.1 belongs to which class of IPv4?', ['Class A', 'Class B', 'Class C', 'Class D'], 2, 'First octet 192 to 223 is Class C, and this is a private range.'),
  B('cn', 'How many links are needed to fully connect 5 devices in a mesh topology?', ['5', '8', '10', '20'], 2, 'n(n - 1)/2 = 5 x 4 / 2 = 10.'),
  B('cn', 'What does NAT do?', ['Translates private IP addresses to a public IP address', 'Encrypts email', 'Assigns MAC addresses', 'Compresses packets'], 0, 'NAT lets many devices share one public IP address.')
];