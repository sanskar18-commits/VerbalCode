import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

// Load environment variables from .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS and enforce strict request body size limit for safety
app.use(cors());
app.use(express.json({ limit: '64kb' }));

// Health check and configuration status endpoint
app.get('/api/status', (req, res) => {
  const hasKey = Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim().length > 0);
  res.json({
    status: 'online',
    geminiConfigured: hasKey
  });
});

/**
 * POST /api/analyze
 * Evaluates DSA code and verbal explanation using Google's official Gemini SDK.
 * Evaluates technical reasoning, data structure selection, and complexity analysis.
 * Never executes student code on the server.
 */
app.post('/api/analyze', async (req, res) => {
  // 1. Validate incoming request payload first
  const {
    problemTitle,
    problemStatement,
    constraints,
    submittedCode,
    language = 'JavaScript',
    transcript
  } = req.body || {};

  if (!problemTitle || typeof problemTitle !== 'string' || !problemTitle.trim()) {
    return res.status(400).json({ error: 'Validation Error: problemTitle is required and must be text.' });
  }

  if (!problemStatement || typeof problemStatement !== 'string') {
    return res.status(400).json({ error: 'Validation Error: problemStatement is required.' });
  }

  if (typeof submittedCode !== 'string' || !submittedCode.trim()) {
    return res.status(400).json({ error: 'Validation Error: submittedCode is required.' });
  }

  if (typeof transcript !== 'string' || !transcript.trim()) {
    return res.status(400).json({
      error: 'Validation Error: transcript is required. Please provide the verbal explanation transcript.'
    });
  }

  // Enforce reasonable length limits to prevent abuse
  if (submittedCode.length > 20000) {
    return res.status(400).json({ error: 'Validation Error: submittedCode exceeds maximum allowed size (20,000 characters).' });
  }

  if (transcript.length > 20000) {
    return res.status(400).json({ error: 'Validation Error: transcript exceeds maximum allowed size (20,000 characters).' });
  }

  // 2. Check for API key presence (Never fabricate mock analysis if key is missing)
  const apiKey = process.env.GEMINI_API_KEY ? process.env.GEMINI_API_KEY.trim() : '';
  if (!apiKey) {
    return res.status(503).json({
      error: 'GEMINI_API_KEY is not configured on the server. Please set your GEMINI_API_KEY in the .env file to enable AI analysis.'
    });
  }

  const formattedConstraints = Array.isArray(constraints)
    ? constraints.join('; ')
    : typeof constraints === 'string'
    ? constraints
    : 'Standard constraints apply.';

  // 3. Construct Gemini evaluation prompt
  const evaluationPrompt = `
You are a Staff Technical Interviewer evaluating a candidate's Data Structures & Algorithms practice interview.

=== PROBLEM SPECIFICATION ===
Title: ${problemTitle}
Statement: ${problemStatement}
Constraints: ${formattedConstraints}
Candidate Language: ${language}

=== CANDIDATE SUBMITTED CODE (DO NOT EXECUTE) ===
\`\`\`
${submittedCode}
\`\`\`

=== CANDIDATE SPOKEN EXPLANATION TRANSCRIPT ===
"${transcript}"

=== MANDATORY EVALUATION RULES ===
1. EVALUATE TECHNICAL REASONING ONLY: Grade purely on technical accuracy, data structure justification, algorithm efficiency, and consistency between the spoken words and the code. DO NOT penalize for grammar, accent, speech filler words ("um", "uh"), or minor linguistic phrasing in the transcript.
2. CRITICAL ACCURACY RULE: Distinguish an incorrect algorithm from an unclear explanation. DO NOT assume the code is correct merely because the explanation sounds convincing. Verify if the code has runtime bugs, off-by-one errors, or wrong asymptotic complexity.
3. CODE & EXPLANATION CONSISTENCY: Check whether the candidate actually implemented what they claimed verbally.

Return your evaluation STRICTLY as valid JSON matching this schema:
{
  "overallScore": number (0-100),
  "problemUnderstandingScore": number (0-100),
  "approachExplanationScore": number (0-100),
  "dataStructureJustificationScore": number (0-100),
  "timeComplexityScore": number (0-100),
  "spaceComplexityScore": number (0-100),
  "codeExplanationConsistencyScore": number (0-100),
  "strengths": [ "string", "string" ],
  "areasForImprovement": [ "string", "string" ],
  "actionableSuggestions": [ "string", "string" ],
  "summaryVerdict": "string"
}
`;

  // 4. Call Gemini using official @google/genai SDK
  try {
    const ai = new GoogleGenAI({ apiKey });

    // Use current supported flash model with automatic fallback
    let response;
    try {
      response = await ai.models.generateContent({
        model: 'gemini-3.5-flash-lite',
        contents: evaluationPrompt,
        config: {
          responseMimeType: 'application/json'
        }
      });
    } catch (modelErr) {
      console.warn('Retrying with gemini-3.8-flash fallback due to:', modelErr.message || modelErr);
      response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: evaluationPrompt,
        config: {
          responseMimeType: 'application/json'
        }
      });
    }

    const responseText = response.text ? response.text.trim() : '';
    if (!responseText) {
      throw new Error('Gemini returned an empty response.');
    }

    // 5. Parse and validate structured output
    const cleanedJson = responseText.replace(/^```json\n?/, '').replace(/\n?```$/, '').trim();
    const evaluation = JSON.parse(cleanedJson);

    // Validate score ranges
    const clampScore = (num, fallback = 70) => {
      const parsed = parseInt(num, 10);
      return isNaN(parsed) ? fallback : Math.max(0, Math.min(100, parsed));
    };

    const validatedResult = {
      overallScore: clampScore(evaluation.overallScore, 75),
      problemUnderstandingScore: clampScore(evaluation.problemUnderstandingScore, 75),
      approachExplanationScore: clampScore(evaluation.approachExplanationScore, 75),
      dataStructureJustificationScore: clampScore(evaluation.dataStructureJustificationScore, 75),
      timeComplexityScore: clampScore(evaluation.timeComplexityScore, 75),
      spaceComplexityScore: clampScore(evaluation.spaceComplexityScore, 75),
      codeExplanationConsistencyScore: clampScore(evaluation.codeExplanationConsistencyScore, 75),
      strengths: Array.isArray(evaluation.strengths) && evaluation.strengths.length > 0
        ? evaluation.strengths
        : ['Provided a complete implementation with verbal reasoning.'],
      areasForImprovement: Array.isArray(evaluation.areasForImprovement) && evaluation.areasForImprovement.length > 0
        ? evaluation.areasForImprovement
        : ['Continue refining trade-off explanations and edge-case testing.'],
      actionableSuggestions: Array.isArray(evaluation.actionableSuggestions) && evaluation.actionableSuggestions.length > 0
        ? evaluation.actionableSuggestions
        : ['Practice stating time and space complexity in Big-O up front before writing code.'],
      summaryVerdict: typeof evaluation.summaryVerdict === 'string' && evaluation.summaryVerdict.trim()
        ? evaluation.summaryVerdict
        : 'Detailed analysis completed by Gemini AI.'
    };

    return res.json(validatedResult);
  } catch (error) {
    console.error('Error invoking Gemini API in /api/analyze:', error.message || error);
    return res.status(502).json({
      error: `Gemini API evaluation failed: ${error.message || 'Service temporarily unavailable. Please check your API key or network connection.'}`
    });
  }
});

// Start listening
app.listen(PORT, () => {
  console.log(`VerbalCode Backend Server running on http://localhost:${PORT}`);
  console.log(`Gemini API Key configured: ${Boolean(process.env.GEMINI_API_KEY)}`);
});

