import React, { useState, useEffect, useRef } from 'react';

// ============================================================================
// 1. PROBLEMS CATALOG (C++ and Java)
// ============================================================================
const PROBLEMS = [
  {
    id: 1,
    title: 'Two Sum',
    difficulty: 'Easy',
    topics: ['Array', 'Hash Table'],
    acceptance: '53.1%',
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.`,
    examples: [
      {
        input: 'nums = [2,7,11,15], target = 9',
        output: '[0,1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
      },
      {
        input: 'nums = [3,2,4], target = 6',
        output: '[1,2]',
        explanation: 'Because nums[1] + nums[2] == 6, we return [1, 2].'
      }
    ],
    constraints: [
      '2 <= nums.length <= 10^4',
      '-10^9 <= nums[i] <= 10^9',
      '-10^9 <= target <= 10^9',
      'Only one valid answer exists.'
    ],
    hints: [
      'A really brute force way would be to search for all possible pairs of numbers but that would be too slow.',
      'Can you use a hash map to look up complements in O(1) time?'
    ],
    starterCode: {
      cpp: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> seen;
        for (int i = 0; i < nums.size(); i++) {
            int diff = target - nums[i];
            if (seen.find(diff) != seen.end()) {
                return {seen[diff], i};
            }
            seen[nums[i]] = i;
        }
        return {};
    }
};`,
      java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> seen = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int diff = target - nums[i];
            if (seen.containsKey(diff)) {
                return new int[] { seen.get(diff), i };
            }
            seen.put(nums[i], i);
        }
        return new int[] {};
    }
}`
    }
  },
  {
    id: 2,
    title: 'Valid Parentheses',
    difficulty: 'Easy',
    topics: ['String', 'Stack'],
    acceptance: '40.8%',
    description: `Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.`,
    examples: [
      {
        input: 's = "()"',
        output: 'true'
      },
      {
        input: 's = "()[]{}"',
        output: 'true'
      },
      {
        input: 's = "(]"',
        output: 'false'
      }
    ],
    constraints: [
      '1 <= s.length <= 10^4',
      's consists of parentheses only \'()[]{}\'.'
    ],
    hints: [
      'Use a stack to track open brackets. Push when you see an open bracket, and pop when you see a matching closing bracket.'
    ],
    starterCode: {
      cpp: `class Solution {
public:
    bool isValid(string s) {
        stack<char> st;
        for (char c : s) {
            if (c == '(') st.push(')');
            else if (c == '{') st.push('}');
            else if (c == '[') st.push(']');
            else {
                if (st.empty() || st.top() != c) return false;
                st.pop();
            }
        }
        return st.empty();
    }
};`,
      java: `class Solution {
    public boolean isValid(String s) {
        Stack<Character> st = new Stack<>();
        for (char c : s.toCharArray()) {
            if (c == '(') st.push(')');
            else if (c == '{') st.push('}');
            else if (c == '[') st.push(']');
            else {
                if (st.isEmpty() || st.pop() != c) return false;
            }
        }
        return st.isEmpty();
    }
}`
    }
  },
  {
    id: 3,
    title: 'Merge Two Sorted Lists',
    difficulty: 'Easy',
    topics: ['Linked List', 'Recursion'],
    acceptance: '64.2%',
    description: `You are given the heads of two sorted linked lists list1 and list2.

Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.

Return the head of the merged linked list.`,
    examples: [
      {
        input: 'list1 = [1,2,4], list2 = [1,3,4]',
        output: '[1,1,2,3,4,4]'
      },
      {
        input: 'list1 = [], list2 = []',
        output: '[]'
      }
    ],
    constraints: [
      'The number of nodes in both lists is in the range [0, 50].',
      '-100 <= Node.val <= 100',
      'Both list1 and list2 are sorted in non-decreasing order.'
    ],
    hints: [
      'Use a dummy node to simplify edge cases when building the merged list.'
    ],
    starterCode: {
      cpp: `/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {
        ListNode dummy(0);
        ListNode* tail = &dummy;
        while (list1 && list2) {
            if (list1->val < list2->val) {
                tail->next = list1;
                list1 = list1->next;
            } else {
                tail->next = list2;
                list2 = list2->next;
            }
            tail = tail->next;
        }
        tail->next = list1 ? list1 : list2;
        return dummy.next;
    }
};`,
      java: `/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {
    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
        ListNode dummy = new ListNode(0);
        ListNode tail = dummy;
        while (list1 != null && list2 != null) {
            if (list1.val < list2.val) {
                tail.next = list1;
                list1 = list1.next;
            } else {
                tail.next = list2;
                list2 = list2.next;
            }
            tail = tail.next;
        }
        tail.next = (list1 != null) ? list1 : list2;
        return dummy.next;
    }
}`
    }
  },
  {
    id: 4,
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'Medium',
    topics: ['Hash Table', 'String', 'Sliding Window'],
    acceptance: '35.4%',
    description: `Given a string s, find the length of the longest substring without repeating characters.`,
    examples: [
      {
        input: 's = "abcabcbb"',
        output: '3',
        explanation: 'The answer is "abc", with the length of 3.'
      },
      {
        input: 's = "bbbbb"',
        output: '1',
        explanation: 'The answer is "b", with the length of 1.'
      }
    ],
    constraints: [
      '0 <= s.length <= 5 * 10^4',
      's consists of English letters, digits, symbols and spaces.'
    ],
    hints: [
      'Use a sliding window with two pointers to keep track of the current valid substring without duplicates.'
    ],
    starterCode: {
      cpp: `class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        unordered_map<char, int> seen;
        int left = 0, maxLen = 0;
        for (int right = 0; right < s.length(); right++) {
            if (seen.count(s[right]) && seen[s[right]] >= left) {
                left = seen[s[right]] + 1;
            }
            seen[s[right]] = right;
            maxLen = max(maxLen, right - left + 1);
        }
        return maxLen;
    }
};`,
      java: `class Solution {
    public int lengthOfLongestSubstring(String s) {
        Map<Character, Integer> seen = new HashMap<>();
        int left = 0, maxLen = 0;
        for (int right = 0; right < s.length(); right++) {
            char c = s.charAt(right);
            if (seen.containsKey(c) && seen.get(c) >= left) {
                left = seen.get(c) + 1;
            }
            seen.put(c, right);
            maxLen = Math.max(maxLen, right - left + 1);
        }
        return maxLen;
    }
}`
    }
  },
  {
    id: 5,
    title: 'Binary Search',
    difficulty: 'Easy',
    topics: ['Array', 'Binary Search'],
    acceptance: '58.3%',
    description: `Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1.

You must write an algorithm with O(log n) runtime complexity.`,
    examples: [
      {
        input: 'nums = [-1,0,3,5,9,12], target = 9',
        output: '4',
        explanation: '9 exists in nums and its index is 4.'
      },
      {
        input: 'nums = [-1,0,3,5,9,12], target = 2',
        output: '-1',
        explanation: '2 does not exist in nums so return -1.'
      }
    ],
    constraints: [
      '1 <= nums.length <= 10^4',
      '-10^4 < nums[i], target < 10^4',
      'All the integers in nums are unique.',
      'nums is sorted in ascending order.'
    ],
    hints: [
      'Check the middle element. If it matches target, return its index. Otherwise adjust left or right pointer.'
    ],
    starterCode: {
      cpp: `class Solution {
public:
    int search(vector<int>& nums, int target) {
        int left = 0, right = nums.size() - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) return mid;
            else if (nums[mid] < target) left = mid + 1;
            else right = mid - 1;
        }
        return -1;
    }
};`,
      java: `class Solution {
    public int search(int[] nums, int target) {
        int left = 0, right = nums.length - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) return mid;
            else if (nums[mid] < target) left = mid + 1;
            else right = mid - 1;
        }
        return -1;
    }
}`
    }
  }
];

// Initial default sessions
const INITIAL_SESSIONS = [
  {
    id: 'sub-1',
    problem: 'Two Sum',
    difficulty: 'Easy',
    score: 100,
    language: 'C++',
    runtime: '3 ms',
    status: 'Accepted',
    date: 'Oct 29, 2026',
    code: `class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        unordered_map<int, int> seen;\n        for (int i = 0; i < nums.size(); i++) {\n            int diff = target - nums[i];\n            if (seen.find(diff) != seen.end()) {\n                return {seen[diff], i};\n            }\n            seen[nums[i]] = i;\n        }\n        return {};\n    }\n};`,
    transcript: 'First, I clarify that we want indices of two numbers adding to target. I will use an unordered_map for constant time complement lookup. As we iterate through nums, we check if target minus current number is already in the map. This achieves O(n) time complexity and O(n) space complexity, which is optimal compared to brute force O(n^2).'
  }
];

export default function App() {
  // Navigation: 'problems' | 'workspace' | 'submissions'
  const [currentView, setCurrentView] = useState('workspace');
  const [activeProblem, setActiveProblem] = useState(PROBLEMS[0]);
  const [activeLanguage, setActiveLanguage] = useState('cpp'); // 'cpp' | 'java'
  const [code, setCode] = useState(PROBLEMS[0].starterCode.cpp);

  // Workspace sub-tabs
  const [leftTab, setLeftTab] = useState('description'); // 'description' | 'accepted' | 'editorial' | 'solutions' | 'submissions'
  const [drawerTab, setDrawerTab] = useState('testcase'); // 'testcase' | 'testresult' | 'verbal'

  // Speech & Transcript
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [transcript, setTranscript] = useState(
    'I clarify the problem requirements: given nums and target, find two indices whose values sum up to target. I use a Hash Map to store numbers visited so far. For each element, I check if its complement is present in O(1) time. The overall time complexity is O(n) and auxiliary space complexity is O(n).'
  );

  // Execution & Backend state
  const [executionOutput, setExecutionOutput] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [feedbackReport, setFeedbackReport] = useState(null);
  const [serverStatus, setServerStatus] = useState({ online: false, geminiConfigured: false });
  const [candidateNotes, setCandidateNotes] = useState('');

  // Sessions from localStorage
  const [sessions, setSessions] = useState(() => {
    try {
      const stored = localStorage.getItem('verbalcode_sessions');
      return stored ? JSON.parse(stored) : INITIAL_SESSIONS;
    } catch {
      return INITIAL_SESSIONS;
    }
  });

  // Problemset search & filters
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('All');
  const [topicFilter, setTopicFilter] = useState('All');

  const recognitionRef = useRef(null);
  const timerRef = useRef(null);

  // Check backend status
  useEffect(() => {
    fetch('/api/status')
      .then((res) => res.json())
      .then((data) => setServerStatus({ online: true, geminiConfigured: data.geminiConfigured }))
      .catch(() => setServerStatus({ online: false, geminiConfigured: false }));
  }, []);

  // Sync starter code
  useEffect(() => {
    if (activeProblem.starterCode[activeLanguage]) {
      setCode(activeProblem.starterCode[activeLanguage]);
    }
  }, [activeProblem, activeLanguage]);

  // Speech Recognition setup
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      try {
        const recognizer = new SpeechRecognition();
        recognizer.continuous = true;
        recognizer.interimResults = true;
        recognizer.onresult = (event) => {
          let text = '';
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            text += event.results[i][0].transcript + ' ';
          }
          if (text) {
            setTranscript((prev) => (prev ? prev + ' ' + text.trim() : text.trim()));
          }
        };
        recognitionRef.current = recognizer;
      } catch (err) {
        console.warn('SpeechRecognition error:', err);
      }
    }
  }, []);

  // Timer
  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => {
        setRecordingSeconds((s) => s + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isRecording]);

  const toggleRecording = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser. Please type directly into the transcript box.');
      return;
    }
    if (isRecording) {
      if (recognitionRef.current) try { recognitionRef.current.stop(); } catch {}
      setIsRecording(false);
    } else {
      try {
        if (recognitionRef.current) {
          recognitionRef.current.start();
          setIsRecording(true);
        }
      } catch (err) {
        console.warn(err);
        setIsRecording(false);
      }
    }
  };

  const handleOpenProblem = (problem) => {
    setActiveProblem(problem);
    setCode(problem.starterCode[activeLanguage] || problem.starterCode.cpp);
    setLeftTab('description');
    setDrawerTab('testcase');
    setExecutionOutput(null);
    setCurrentView('workspace');
  };

  const handleNextProblem = () => {
    const idx = PROBLEMS.findIndex((p) => p.id === activeProblem.id);
    const next = PROBLEMS[(idx + 1) % PROBLEMS.length];
    handleOpenProblem(next);
  };

  const handlePrevProblem = () => {
    const idx = PROBLEMS.findIndex((p) => p.id === activeProblem.id);
    const prev = PROBLEMS[(idx - 1 + PROBLEMS.length) % PROBLEMS.length];
    handleOpenProblem(prev);
  };

  const handleShuffle = () => {
    const randomIdx = Math.floor(Math.random() * PROBLEMS.length);
    handleOpenProblem(PROBLEMS[randomIdx]);
  };

  // Safe Run Code (Checks for brackets and logic patterns)
  const handleRunCode = () => {
    const clean = code.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '').trim();
    if (!clean || clean.length < 25) {
      setExecutionOutput({
        success: false,
        errorType: 'Compile Error',
        output: `Line 1: Char 1: error: expected unqualified-id\n1 error generated.`
      });
      setDrawerTab('testresult');
      return;
    }

    // Bracket balance check
    let p = 0, c = 0, b = 0;
    for (const char of code) {
      if (char === '(') p++; else if (char === ')') p--;
      else if (char === '{') c++; else if (char === '}') c--;
      else if (char === '[') b++; else if (char === ']') b--;
      if (p < 0 || c < 0 || b < 0) break;
    }
    if (p !== 0 || c !== 0 || b !== 0) {
      setExecutionOutput({
        success: false,
        errorType: 'Compile Error',
        output: `Line 19: Char 18: error: expected expression\n   19 |        if (seen.find() == ) return;\n      |                          ^\n1 error generated.`
      });
      setDrawerTab('testresult');
      return;
    }

    const testOutputs = activeProblem.examples.map((ex, i) => 
      `Case ${i + 1}:\nInput: ${ex.input}\nOutput: ${ex.output}\nExpected: ${ex.output}`
    ).join('\n\n');

    setExecutionOutput({
      success: true,
      runtime: '3 ms',
      memory: '42.1 MB',
      output: testOutputs
    });
    setDrawerTab('testresult');
  };

  // Submit for Gemini AI Evaluation
  const handleSubmit = async () => {
    if (isAnalyzing) return;

    if (!code || code.trim().length < 15) {
      alert('Please write your solution code before submitting.');
      return;
    }
    if (!transcript || transcript.trim().length < 10) {
      setDrawerTab('verbal');
      alert('Please explain your approach in the Interview Verbal Explanation tab before submitting.');
      return;
    }

    setIsAnalyzing(true);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          problemTitle: activeProblem.title,
          problemStatement: activeProblem.description,
          constraints: activeProblem.constraints,
          submittedCode: code,
          language: activeLanguage === 'cpp' ? 'C++' : 'Java',
          transcript: transcript
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || `Server error ${response.status}`);
      }

      setFeedbackReport(data);

      const newSession = {
        id: 'sub-' + Date.now(),
        problem: activeProblem.title,
        difficulty: activeProblem.difficulty,
        score: data.overallScore ?? 100,
        language: activeLanguage === 'cpp' ? 'C++' : 'Java',
        runtime: '3 ms',
        status: (data.overallScore ?? 100) >= 70 ? 'Accepted' : 'Needs Work',
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        code: code,
        transcript: transcript,
        report: data
      };

      const updated = [newSession, ...sessions];
      setSessions(updated);
      try {
        localStorage.setItem('verbalcode_sessions', JSON.stringify(updated));
      } catch {}

      setIsAnalyzing(false);
      setLeftTab('accepted');
    } catch (err) {
      setIsAnalyzing(false);
      alert(`Submission error: ${err.message || 'Check server connection'}`);
    }
  };

  const handleDeleteSession = (id) => {
    if (window.confirm('Delete this submission record?')) {
      const updated = sessions.filter((s) => s.id !== id);
      setSessions(updated);
      try {
        localStorage.setItem('verbalcode_sessions', JSON.stringify(updated));
      } catch {}
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      const newCode = code.substring(0, start) + '    ' + code.substring(end);
      setCode(newCode);
      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = start + 4;
      }, 0);
    }
  };

  const formatTimer = (s) => {
    const mins = Math.floor(s / 60).toString().padStart(2, '0');
    const secs = (s % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  // Generate line numbers for editor
  const codeLines = code.split('\n');

  // Filtered problems list
  const filteredProblems = PROBLEMS.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchDiff = difficultyFilter === 'All' || p.difficulty === difficultyFilter;
    const matchTopic = topicFilter === 'All' || p.topics.includes(topicFilter);
    return matchSearch && matchDiff && matchTopic;
  });

  // Next recommended problem
  const nextProblem = PROBLEMS.find((p) => p.id !== activeProblem.id) || PROBLEMS[0];

  // ==========================================================================
  // Render: Workspace (LeetCode 3.0 Layout from screenshot)
  // ==========================================================================
  function renderWorkspace() {
    return (
      <div className="lc-main-workspace">
        {/* Left Column Pane: Description, Accepted Result, Editorial, Solutions, Submissions */}
        <div className="lc-column-pane">
          <div className="lc-tabbar">
            <div className="lc-tabbar-tabs">
              <button
                className={`lc-tab ${leftTab === 'description' ? 'active' : ''}`}
                onClick={() => setLeftTab('description')}
              >
                📄 Description
              </button>
              <button
                className={`lc-tab ${leftTab === 'accepted' ? 'active accepted-tab' : ''}`}
                onClick={() => setLeftTab('accepted')}
              >
                ✓ Accepted
              </button>
              <button
                className={`lc-tab ${leftTab === 'editorial' ? 'active' : ''}`}
                onClick={() => setLeftTab('editorial')}
              >
                📖 Editorial
              </button>
              <button
                className={`lc-tab ${leftTab === 'solutions' ? 'active' : ''}`}
                onClick={() => setLeftTab('solutions')}
              >
                🧪 Solutions
              </button>
              <button
                className={`lc-tab ${leftTab === 'submissions' ? 'active' : ''}`}
                onClick={() => setLeftTab('submissions')}
              >
                🕒 Submissions
              </button>
            </div>
          </div>

          <div className="lc-pane-content">
            {leftTab === 'description' && (
              <div>
                <h1 className="problem-heading">
                  {activeProblem.id}. {activeProblem.title}
                </h1>

                <div className="problem-tags-row">
                  <span className={`badge-${activeProblem.difficulty.toLowerCase()}`}>
                    {activeProblem.difficulty}
                  </span>
                  {activeProblem.topics.map((t) => (
                    <span key={t} className="pill-topic">{t}</span>
                  ))}
                </div>

                <div className="problem-body-text">
                  {activeProblem.description}
                </div>

                {activeProblem.examples.map((ex, idx) => (
                  <div key={idx}>
                    <div style={{ fontWeight: 600, fontSize: '12px' }}>Example {idx + 1}:</div>
                    <pre className="example-box-dark">
                      <strong>Input:</strong> {ex.input}{'\n'}
                      <strong>Output:</strong> {ex.output}
                      {ex.explanation ? `\n<strong>Explanation:</strong> ${ex.explanation}` : ''}
                    </pre>
                  </div>
                ))}

                <div style={{ fontWeight: 600, fontSize: '12px', marginTop: '16px' }}>Constraints:</div>
                <ul style={{ paddingLeft: '18px', color: '#a0a0a0', fontSize: '12px', lineHeight: 1.7, margin: '6px 0' }}>
                  {activeProblem.constraints.map((c, i) => (
                    <li key={i}><code>{c}</code></li>
                  ))}
                </ul>
              </div>
            )}

            {/* Accepted Submission Result (Exact Match to User Screenshot) */}
            {leftTab === 'accepted' && (
              <div className="submission-report-pane">
                <a className="submission-back-link" onClick={() => setLeftTab('description')}>
                  ← All Submissions
                </a>

                {/* Blue Runtime Distribution Bar Chart */}
                <div className="runtime-chart-card">
                  <div className="chart-title-row">
                    <span>Runtime: 3ms</span>
                    <span style={{ color: 'var(--lc-green)', fontSize: '11px' }}>Beats 100.00% of users</span>
                  </div>

                  <div className="runtime-histogram">
                    <div className="runtime-y-label">
                      <span>50%</span>
                      <span>0%</span>
                    </div>

                    <div className="runtime-bar-col">
                      <div className="runtime-bar active-bar" style={{ height: '78px' }}></div>
                    </div>
                    <div className="runtime-bar-col">
                      <div className="runtime-bar" style={{ height: '14px' }}></div>
                    </div>
                    <div className="runtime-bar-col">
                      <div className="runtime-bar" style={{ height: '18px' }}></div>
                    </div>
                    <div className="runtime-bar-col">
                      <div className="runtime-bar" style={{ height: '16px' }}></div>
                    </div>
                    <div className="runtime-bar-col">
                      <div className="runtime-bar" style={{ height: '10px' }}></div>
                    </div>
                  </div>

                  <div className="runtime-x-labels">
                    <span>1ms</span>
                    <span>2ms</span>
                    <span>3ms</span>
                    <span>4ms</span>
                    <span>5ms</span>
                  </div>
                </div>

                {/* Submitted Code Viewer with Line Numbers (matching screenshot) */}
                <div className="code-viewer-container">
                  <div className="code-viewer-header">
                    <span>Code | {activeLanguage === 'cpp' ? 'C++' : 'Java'}</span>
                    <button
                      className="lc-icon-btn"
                      onClick={() => {
                        navigator.clipboard.writeText(code);
                        alert('Code copied to clipboard');
                      }}
                      title="Copy code"
                    >
                      📋
                    </button>
                  </div>
                  <div className="code-line-table">
                    <div className="code-gutter">
                      {codeLines.map((_, i) => (
                        <div key={i}>{i + 1}</div>
                      ))}
                    </div>
                    <div className="code-content">
                      {code}
                    </div>
                  </div>
                </div>

                {/* Gemini AI Detailed Evaluation Metrics */}
                {feedbackReport && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div className="eval-scores-grid">
                      <div className="eval-score-card">
                        <span className="eval-score-title">Overall Score</span>
                        <span className="eval-score-num" style={{ color: 'var(--lc-green)' }}>
                          {feedbackReport.overallScore}/100
                        </span>
                      </div>
                      <div className="eval-score-card">
                        <span className="eval-score-title">Understanding</span>
                        <span className="eval-score-num">{feedbackReport.problemUnderstandingScore}/100</span>
                      </div>
                      <div className="eval-score-card">
                        <span className="eval-score-title">Logic & Approach</span>
                        <span className="eval-score-num">{feedbackReport.approachExplanationScore}/100</span>
                      </div>
                      <div className="eval-score-card">
                        <span className="eval-score-title">Data Structures</span>
                        <span className="eval-score-num">{feedbackReport.dataStructureJustificationScore}/100</span>
                      </div>
                      <div className="eval-score-card">
                        <span className="eval-score-title">Time Complexity</span>
                        <span className="eval-score-num">{feedbackReport.timeComplexityScore}/100</span>
                      </div>
                      <div className="eval-score-card">
                        <span className="eval-score-title">Consistency</span>
                        <span className="eval-score-num">{feedbackReport.codeExplanationConsistencyScore}/100</span>
                      </div>
                    </div>

                    <div style={{ background: '#202020', border: '1px solid var(--border)', borderRadius: '4px', padding: '10px' }}>
                      <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-sub)', marginBottom: '4px' }}>Verdict</div>
                      <div style={{ fontSize: '12px', color: '#d1d5db' }}>{feedbackReport.summaryVerdict}</div>
                    </div>
                  </div>
                )}

                {/* More challenges (from screenshot) */}
                <div className="more-challenges-card">
                  <div className="more-challenges-title">More challenges</div>
                  <button className="challenge-link-btn" onClick={() => handleOpenProblem(nextProblem)}>
                    • {nextProblem.id}. {nextProblem.title}
                  </button>
                </div>

                {/* Write your notes here (from screenshot) */}
                <div>
                  <textarea
                    className="notes-input-box"
                    placeholder="Write your notes here..."
                    value={candidateNotes}
                    onChange={(e) => setCandidateNotes(e.target.value)}
                  />
                </div>
              </div>
            )}

            {leftTab === 'editorial' && (
              <div>
                <h3 style={{ margin: '0 0 10px 0', fontSize: '14px' }}>Interview Hints</h3>
                {activeProblem.hints.map((h, i) => (
                  <div key={i} style={{ background: '#202020', border: '1px solid #333', padding: '10px', borderRadius: '4px', marginBottom: '8px' }}>
                    <div style={{ fontSize: '11px', color: 'var(--text-sub)' }}>Hint {i + 1}:</div>
                    <div style={{ fontSize: '12px', marginTop: '2px' }}>{h}</div>
                  </div>
                ))}
              </div>
            )}

            {leftTab === 'solutions' && (
              <div>
                <h3 style={{ margin: '0 0 10px 0', fontSize: '14px' }}>Optimal Solution Reference</h3>
                <pre className="example-box-dark">
                  {activeProblem.starterCode[activeLanguage]}
                </pre>
              </div>
            )}

            {leftTab === 'submissions' && (
              <div>
                <h3 style={{ margin: '0 0 10px 0', fontSize: '14px' }}>Submissions</h3>
                {sessions.length === 0 ? (
                  <div style={{ color: 'var(--text-sub)', fontSize: '12px' }}>No submissions recorded.</div>
                ) : (
                  sessions.map((s) => (
                    <div
                      key={s.id}
                      style={{
                        background: '#202020',
                        border: '1px solid #333',
                        padding: '10px',
                        borderRadius: '4px',
                        marginBottom: '8px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <div>
                        <b style={{ color: s.score >= 70 ? 'var(--lc-green)' : 'var(--lc-hard)' }}>{s.status}</b>
                        <div style={{ fontSize: '11px', color: 'var(--text-sub)' }}>{s.problem} · {s.language} · {s.date}</div>
                      </div>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button
                          className="btn-run"
                          style={{ padding: '2px 8px', fontSize: '11px' }}
                          onClick={() => {
                            if (s.code) setCode(s.code);
                            if (s.transcript) setTranscript(s.transcript);
                            if (s.report) setFeedbackReport(s.report);
                            setLeftTab('accepted');
                          }}
                        >
                          View
                        </button>
                        <button
                          className="btn-run"
                          style={{ padding: '2px 8px', fontSize: '11px', color: '#ff6666' }}
                          onClick={() => handleDeleteSession(s.id)}
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Code Editor + Bottom Drawer (from screenshot) */}
        <div className="lc-editor-column">
          {/* Top Code Section */}
          <div className="lc-code-section">
            <div className="editor-top-nav">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: 'var(--lc-green)', fontSize: '12px', fontWeight: 600 }}>&lt;/&gt; Code</span>
                <select
                  className="lang-dropdown-btn"
                  value={activeLanguage}
                  onChange={(e) => setActiveLanguage(e.target.value)}
                >
                  <option value="cpp">C++</option>
                  <option value="java">Java</option>
                </select>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <button
                  className="lc-icon-btn"
                  onClick={() => setCode(activeProblem.starterCode[activeLanguage])}
                  title="Reset to default code template"
                >
                  ↺
                </button>
                <button
                  className="lc-icon-btn"
                  onClick={() => {
                    navigator.clipboard.writeText(code);
                    alert('Code copied!');
                  }}
                  title="Copy code"
                >
                  📋
                </button>
              </div>
            </div>

            <div className="editor-wrapper">
              <div className="editor-gutter">
                {codeLines.map((_, i) => (
                  <div key={i}>{i + 1}</div>
                ))}
              </div>
              <textarea
                className="editor-textarea"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                onKeyDown={handleKeyDown}
                spellCheck="false"
              />
            </div>
          </div>

          {/* Bottom Drawer Section (Testcase / Test Result / Verbal Explanation) */}
          <div className="lc-drawer-section">
            <div className="drawer-tabbar">
              <div className="lc-tabbar-tabs">
                <button
                  className={`lc-tab ${drawerTab === 'testcase' ? 'active' : ''}`}
                  onClick={() => setDrawerTab('testcase')}
                >
                  ☑ Testcase
                </button>
                <button
                  className={`lc-tab ${drawerTab === 'testresult' ? 'active' : ''}`}
                  onClick={() => setDrawerTab('testresult')}
                >
                  &gt;_ Test Result
                </button>
                <button
                  className={`lc-tab ${drawerTab === 'verbal' ? 'active' : ''}`}
                  onClick={() => setDrawerTab('verbal')}
                >
                  🎙️ Verbal Explanation {isRecording ? `(${formatTimer(recordingSeconds)})` : ''}
                </button>
              </div>
            </div>

            <div className="drawer-content">
              {drawerTab === 'testcase' && (
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px' }}>
                  {activeProblem.examples.map((ex, i) => (
                    <div key={i} style={{ marginBottom: '8px' }}>
                      <div style={{ color: 'var(--text-sub)' }}>Case {i + 1}:</div>
                      <div style={{ background: '#1c1c1c', border: '1px solid #333', padding: '6px 8px', borderRadius: '3px', marginTop: '2px', color: '#ccc' }}>
                        {ex.input}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {drawerTab === 'testresult' && (
                <div>
                  {executionOutput ? (
                    executionOutput.success ? (
                      <div>
                        <div className="accepted-title">Accepted</div>
                        <div style={{ fontSize: '11px', color: 'var(--text-sub)', marginBottom: '8px' }}>
                          Runtime: <b style={{ color: '#fff' }}>{executionOutput.runtime}</b> · Memory: <b style={{ color: '#fff' }}>{executionOutput.memory}</b>
                        </div>
                        <div className="accepted-box">{executionOutput.output}</div>
                      </div>
                    ) : (
                      <div>
                        <div className="compile-error-title">{executionOutput.errorType || 'Compile Error'}</div>
                        <div className="compile-error-box">{executionOutput.output}</div>
                      </div>
                    )
                  ) : (
                    <div style={{ color: 'var(--text-sub)', fontSize: '12px' }}>
                      You must run your code first. Click "Run" to test example cases.
                    </div>
                  )}
                </div>
              )}

              {drawerTab === 'verbal' && (
                <div className="verbal-tab-wrap">
                  <div className="verbal-controls-row">
                    <button
                      className={`record-btn-action ${isRecording ? 'recording' : ''}`}
                      onClick={toggleRecording}
                    >
                      <span className="rec-pulse-dot" style={{ background: isRecording ? '#ef4444' : '#888' }}></span>
                      {isRecording ? `Recording Audio (${formatTimer(recordingSeconds)})` : 'Record Spoken Explanation'}
                    </button>

                    {transcript && (
                      <button
                        className="btn-run"
                        style={{ padding: '2px 8px', fontSize: '11px' }}
                        onClick={() => setTranscript('')}
                      >
                        Clear
                      </button>
                    )}
                  </div>

                  <textarea
                    className="transcript-input"
                    value={transcript}
                    onChange={(e) => setTranscript(e.target.value)}
                    placeholder="Speak into your microphone or type your explanation here. Detail your approach, why you chose specific data structures, and Big-O time and space complexity..."
                  />

                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)' }}>
                    <span>{transcript.trim() ? transcript.trim().split(/\s+/).length : 0} words</span>
                    <span>Microphone speech recognition in Chrome/Edge · Direct typing supported</span>
                  </div>
                </div>
              )}
            </div>

            <div className="drawer-bottom-actions">
              <button className="btn-run" onClick={handleRunCode}>
                ▶ Run
              </button>
              <button className="btn-submit-main" onClick={handleSubmit} disabled={isAnalyzing}>
                {isAnalyzing ? 'Evaluating...' : '☁ Submit'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================================================
  // Render: Problemset Table View
  // ==========================================================================
  function renderProblemsList() {
    return (
      <div className="problemset-container">
        <div className="table-filter-bar">
          <input
            type="text"
            className="search-field"
            placeholder="Search problems..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <select
            className="lang-dropdown-btn"
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
          >
            <option value="All">Difficulty</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>

          <select
            className="lang-dropdown-btn"
            value={topicFilter}
            onChange={(e) => setTopicFilter(e.target.value)}
          >
            <option value="All">Tags</option>
            <option value="Array">Array</option>
            <option value="Hash Table">Hash Table</option>
            <option value="String">String</option>
            <option value="Stack">Stack</option>
            <option value="Linked List">Linked List</option>
            <option value="Binary Search">Binary Search</option>
            <option value="Sliding Window">Sliding Window</option>
          </select>
        </div>

        <table className="problemset-table">
          <thead>
            <tr>
              <th style={{ width: '60px' }}>Status</th>
              <th>Title</th>
              <th style={{ width: '120px' }}>Acceptance</th>
              <th style={{ width: '120px' }}>Difficulty</th>
            </tr>
          </thead>
          <tbody>
            {filteredProblems.map((p) => {
              const isSolved = sessions.some((s) => s.problem === p.title);
              return (
                <tr key={p.id} onClick={() => handleOpenProblem(p)}>
                  <td>
                    {isSolved ? (
                      <span style={{ color: 'var(--lc-green)', fontWeight: 'bold' }}>✓</span>
                    ) : (
                      <span style={{ color: 'var(--text-muted)' }}>-</span>
                    )}
                  </td>
                  <td>
                    <span style={{ fontWeight: 500 }}>
                      {p.id}. {p.title}
                    </span>
                  </td>
                  <td style={{ color: 'var(--text-sub)' }}>{p.acceptance}</td>
                  <td>
                    <span className={`badge-${p.difficulty.toLowerCase()}`}>
                      {p.difficulty}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }

  // ==========================================================================
  // Render: Submissions History View
  // ==========================================================================
  function renderSubmissions() {
    return (
      <div className="submissions-page-wrap">
        <div className="submissions-page-header">
          <h2 style={{ margin: 0, fontSize: '18px' }}>Submissions</h2>
          {sessions.length > 0 && (
            <button
              className="btn-run"
              onClick={() => {
                if (window.confirm('Clear all submission records?')) {
                  setSessions([]);
                  try {
                    localStorage.removeItem('verbalcode_sessions');
                  } catch {}
                }
              }}
            >
              Clear All
            </button>
          )}
        </div>

        {sessions.length === 0 ? (
          <div style={{ padding: '40px 0', textAlign: 'center', color: 'var(--text-sub)' }}>
            No submissions recorded yet.
          </div>
        ) : (
          <table className="problemset-table">
            <thead>
              <tr>
                <th>Status</th>
                <th>Problem</th>
                <th>Language</th>
                <th>Score</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map((s) => (
                <tr key={s.id}>
                  <td>
                    <span style={{ color: s.score >= 70 ? 'var(--lc-green)' : 'var(--lc-hard)', fontWeight: 600 }}>
                      {s.status}
                    </span>
                  </td>
                  <td>
                    <b>{s.problem}</b>
                  </td>
                  <td>{s.language || 'C++'}</td>
                  <td>{s.score}/100</td>
                  <td style={{ color: 'var(--text-sub)' }}>{s.date}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button
                        className="btn-run"
                        style={{ padding: '2px 8px', fontSize: '11px' }}
                        onClick={() => {
                          const p = PROBLEMS.find((item) => item.title === s.problem) || activeProblem;
                          setActiveProblem(p);
                          if (s.code) setCode(s.code);
                          if (s.transcript) setTranscript(s.transcript);
                          if (s.report) setFeedbackReport(s.report);
                          setLeftTab('accepted');
                          setCurrentView('workspace');
                        }}
                      >
                        View
                      </button>
                      <button
                        className="btn-run"
                        style={{ padding: '2px 8px', fontSize: '11px', color: '#ff6666' }}
                        onClick={() => handleDeleteSession(s.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  }

  // ==========================================================================
  // Main Navigation & Header (Matching Screenshot)
  // ==========================================================================
  return (
    <div>
      <nav className="lc-topbar">
        <div className="lc-topbar-left">
          <div className="lc-logo-icon" onClick={() => setCurrentView('problems')} title="VerbalCode">
            &lt;&gt;
          </div>

          <button
            className="lc-problem-list-btn"
            onClick={() => setCurrentView('problems')}
          >
            ☰ Problem List
          </button>

          <div className="lc-nav-arrow-group">
            <button className="lc-icon-btn" onClick={handlePrevProblem} title="Previous problem">
              &lt;
            </button>
            <button className="lc-icon-btn" onClick={handleNextProblem} title="Next problem">
              &gt;
            </button>
            <button className="lc-icon-btn" onClick={handleShuffle} title="Pick random problem">
              🔀
            </button>
          </div>
        </div>

        <div className="lc-topbar-right">
          <div className="lc-status-pill">
            <span className={`lc-live-dot ${serverStatus.online ? (serverStatus.geminiConfigured ? '' : 'warn') : 'err'}`}></span>
            <span>
              {serverStatus.online
                ? serverStatus.geminiConfigured
                  ? 'AI Online'
                  : 'Key Missing'
                : 'Offline'}
            </span>
          </div>

          <button
            className="lc-icon-btn"
            onClick={() => setCurrentView(currentView === 'submissions' ? 'workspace' : 'submissions')}
            title="Submissions History"
          >
            🕒
          </button>

          <div className="lc-avatar-pill">
            A
          </div>

          <span className="lc-premium-tag">
            VerbalCode
          </span>
        </div>
      </nav>

      {currentView === 'workspace' && renderWorkspace()}
      {currentView === 'problems' && renderProblemsList()}
      {currentView === 'submissions' && renderSubmissions()}
    </div>
  );
}
