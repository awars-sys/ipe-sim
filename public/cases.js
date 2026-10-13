// IPE Dental Collaborator · version 7.0 (cases.js)
// What the students can see: the three patient charts, the question box text, hints,
// and the scripted "backup Maya" used when Claude can't be reached.
// Maya's dental findings for the live chat and the faculty keys are NOT here.
// They live on the server in netlify/data/faculty.mjs, so students can't read them in the browser.
//
// Chart content follows Taylor Watterson's prototype (dental exam findings removed from the chart;
// students ask Maya). Edit text here, commit, and Netlify republishes in about a minute.

// Loaded by the page as a plain script (so it also opens as a file, offline) and by the server function.
(function () {
const ORDER = ["margaret", "lucy", "brian"];

// The four steps inside every case. Step 5 means the joint note is approved and the case is ready to finish.
const STAGES = [
  { k: "Roles", d: "What each profession can do" },
  { k: "Referrals", d: "Top 2 and why" },
  { k: "Tobacco plan", d: "One A at a time" },
  { k: "Joint note", d: "Maya drafts, you approve" }
];
const FIVE_A = { ask: "Ask", advise: "Advise", assess: "Assess", assist: "Assist", arrange: "Arrange" };

const TEAM_INTRO = "Hi everyone, I'm Maya Chen, a D2 at the UIC College of Dentistry. Could each of you introduce yourself?";
const TEAM_BACKUP = "Welcome, everyone. When everyone has introduced themselves, please click \"Begin Margaret's case\".";

// Text shown in the yellow question box for each step. {name} is replaced with the patient's name.
const STEP_TEXT = {
  1: "What can pharmacy and dentistry each do for {name}? Tell Maya what pharmacy would address, and ask her about her dental findings.",
  2: "If you were the first health professional to see {name}, which referrals or consultations would you make? Name your top 2 and why.",
  3: "Build {name}'s tobacco plan with Maya, one A at a time: Ask, Advise, Assess, Assist, Arrange. {match}",
  4: "Maya drafts a joint note (Pharmacy, Dentistry, Follow-up). Review it, then reply \"approved\" or tell her what to change."
};
function stepText(C, s) {
  return (STEP_TEXT[s] || "").replace(/\{name\}/g, C.name).replace("{match}", C.match || "");
}

const NOTE_HINTS = [
  "Check that Maya's note has what pharmacy agreed to do, the dental plan, and every referral under Follow-up.",
  "If something you agreed on is missing, tell Maya what to add before you reply \"approved\"."
];

const CASES = {
  margaret: {
    name: "Margaret", tag: "Practice", initials: "MA", mrn: "SIM-0400", age: "68 y · F",
    flags: ["Current smoker", "Ill-fitting dentures", "Weight loss"],
    match: "Match the plan to her readiness to quit.",
    scenario: "Margaret is a 68-year-old retired schoolteacher who complains of dry mouth, difficulty swallowing and bad breath. She says that her present dentures are ill-fitted and they move when she eats and speaks. She is worried about recent weight loss and does not want lung cancer. She is trying to quit smoking but is struggling with cravings and notices that she smokes more when she is feeling lonely. Margaret says she is an \"8\" out of \"10\" for readiness to quit smoking. She remembers how good she felt the last time she quit smoking, but she does not have the same support she had in the past, explaining why she is not a \"10\".",
    info: [
      ["Medical history", ["Depression", "COPD", "Dry mouth", "Halitosis"]],
      ["Family history", ["Husband passed away; two children and 5 grandchildren"]],
      ["Social history", ["Tobacco: started age 18; 10–15 menthol cigarettes/day; first cigarette within 30 min of waking", "Fagerström score 7", "Triggers: after meals, with coffee, reading, gardening, before bed; smokes more when lonely", "Quit 2000–2002 with nicotine gum 4 mg and 14 mg patches daily for 10 weeks; relapsed after her husband died", "Denies alcohol or illicit drugs", "Diet: soft diet and convenient foods", "Lives alone, very few friends; children live in another state; likes to garden and read", "Occupation: retired schoolteacher"]],
      ["Dental", ["Wears dentures. Dental exam today with Maya Chen, D2. Findings and plan: ask Maya in Secure Chat."]],
      ["Physical exam", ["Ht 160 cm · Wt 62.5 kg · BMI 24.4", "BP 90/60 · HR 100", "Renal and liver function within normal limits"]]
    ],
    meds: [
      ["Spiriva (tiotropium) 18 mcg", "1 capsule for inhalation daily", "COPD"],
      ["Albuterol 90 mcg", "2 inhalations q6h prn shortness of breath", "COPD"],
      ["Coverage", "Medicare plus supplemental covers all tobacco-dependence medications", ""]
    ],
    tobacco: [
      ["Readiness to quit", "8 / 10", "0–2 not ready · 3–5 unsure · 6–9 ready · 10 trying"],
      ["Time to first cigarette", "Within 30 minutes of waking", "5–30 min = 2 points on Fagerström item 1"],
      ["Fagerström score", "7", "1–2 low · 3–4 low to moderate · 5–7 moderate · 8+ high"],
      ["Exhaled CO", "20 ppm", "Non-smoker <6 ppm · 10+ ppm is high"],
      ["Cigarettes per day", "10–15 menthol", ""],
      ["Past quit attempts", "2000–2002 with gum 4 mg + 14 mg patch for 10 weeks; relapsed after husband died", ""]
    ],
    intro: "Let's start with Margaret, our practice case. Take a minute with the Chart Review and Medications tabs on the left. What do you see on the pharmacy side?",
    hints: {
      1: ["Open the Medications tab and look at what each inhaler is for and how it works.", "Ask Maya what she found on her dental exam; it shapes what pharmacy can help with."],
      2: ["Look at Social history in Patient Info: who does she live with, and what support does she have?", "Pick the two referrals that tie to her biggest needs, and give a reason for each."],
      3: ["The Tobacco tab shows her readiness score; the reference range tells you which path of the 5 As fits.", "The Resources tab has the 5 As, the 5 Ds and the NRT table with starting doses.", "Before choosing a product, check how it would work with her dentures and her appetite."],
      4: NOTE_HINTS
    },
    // Backup Maya (no AI): one scripted line per group message, step by step.
    backup: {
      1: ["On my exam, her mouth tissues are moderately inflamed from dentures that don't fit, so I plan to refit or remake them. Looking at the Medications tab, what could be adding to her dry mouth?"],
      2: ["If you were the first health professional to see her, which two referrals would you make, and why? The Patient Info tab, especially social history, may help.", "Which of those two would you make first, and why?"],
      3: ["Let's build her tobacco plan one A at a time, using the Tobacco and Resources tabs. Ask: what would you ask Margaret about her smoking?",
          "Smoking speeds up gum and bone loss and is the reason for her halitosis, which means bad breath. Advise: which personal benefits of quitting would you stress for her?",
          "Assess: what does her readiness score of 8 out of 10 mean for the plan?",
          "Assist: what would your plan include, including which products and starting doses fit her with her dentures?",
          "Arrange: what follow-up would you set up for her?"],
      4: ["Here is the dental part of our joint note. Dentistry: refit or remake her dentures, screen for oral cancer, and explain that quitting will help her breath, taste and gums. Please type the rest of the note as two lines, Pharmacy: and Follow-up:, with every referral under Follow-up.",
          "Thank you, that works as our joint note. Please click \"Finish Margaret and debrief\" below."]
    },
    selfCheck: ["Did you link her dry mouth to a medication and suggest a fix?", "Were your top 2 referrals tied to her biggest needs, with a reason for each?", "Did your plan match her readiness (8/10), with a quit date, a product that works with dentures, and starting doses?", "Does your joint note list every referral under Follow-up?"]
  },

  lucy: {
    name: "Lucy", tag: "Case 1", initials: "LU", mrn: "SIM-0412", age: "49 y · F",
    flags: ["Current smoker", "Oral lesion"],
    match: "Match the plan to her readiness to quit.",
    scenario: "Lucy is a 49-year-old female who presents to clinic today complaining of sore, white patches in her mouth and experiences pain when brushing her teeth or eating hard foods. The sores are preventing her from practicing good oral hygiene. She is currently smoking 5 cigarettes/day. She quit smoking for 2 weeks but recently lost her job and now feels very anxious. Prior to quitting smoking, she smoked a pack of cigarettes every day. Lucy says she is a \"5\" out of \"10\" for readiness to quit smoking in the next 30 days. She has not had to use her albuterol this week. She reports good adherence with her other medications. She does not report any shortness of breath or nighttime symptoms of asthma.",
    info: [
      ["Medical history", ["Generalized anxiety disorder", "Gingivitis", "Asthma, well controlled", "Hypertension"]],
      ["Family history", ["Mother: alive at 79; head and neck squamous cell carcinoma, HTN, hyperlipidemia", "Father: alive at 81; HTN, DM, asthma", "Single, no children"]],
      ["Social history", ["Tobacco: started age 14; 5–20 non-menthol cigarettes/day; first cigarette immediately after waking", "Triggers: stress, other smokers", "Quit attempt: 2 weeks recently, cold turkey, no medications", "Relapse: lost her job and started smoking again", "Marijuana daily to help with anxiety", "Diet: chicken, veggies, pasta; candy at night watching TV (increased since trying to quit)", "Lives alone; often with her neighbor, who smokes", "Occupation: unemployed (ex-factory worker)"]],
      ["Dental", ["Dental exam today with Maya Chen, D2. Findings and plan: ask Maya in Secure Chat."]],
      ["Physical exam", ["Ht 175.3 cm · Wt 99.8 kg · BMI 32.5", "BP 130/80 · P 90", "Renal and liver function within normal limits"]]
    ],
    meds: [
      ["Albuterol 90 mcg HFA", "2 inhalations every 4–6 h as needed for shortness of breath", "Asthma"],
      ["Symbicort (budesonide/formoterol 160/4.5 mcg)", "2 inhalations twice daily", "Asthma"],
      ["Zoloft (sertraline) 50 mg", "PO once daily", "Anxiety"],
      ["Lisinopril 20 mg", "PO once daily", "Hypertension"]
    ],
    tobacco: [
      ["Readiness to quit (next 30 days)", "5 / 10", "0–2 not ready · 3–5 unsure · 6–9 ready · 10 trying"],
      ["Time to first cigarette", "Immediately after waking", "Within 5 min = 3 points on Fagerström item 1"],
      ["Exhaled CO", "24 ppm", "Non-smoker <6 ppm · 10+ ppm is high"],
      ["Cigarettes per day", "5 (was 1 pack/day)", ""],
      ["Past quit attempts", "2 weeks, cold turkey; relapsed after job loss", ""]
    ],
    intro: "Next up is Lucy. She has painful white patches in her mouth and is smoking again. What stands out to you from pharmacy?",
    hints: {
      1: ["Open the Medications tab and look at her inhalers: which one contains a steroid, and what should she do after each dose to protect her mouth?", "Ask Maya what the white patches are; it changes what pharmacy can help with."],
      2: ["Patient Info shows her anxiety, her family history and her recent job loss.", "Pick the two referrals that tie to her biggest needs, and give a reason for each."],
      3: ["Her readiness score is in the Tobacco tab; the reference range tells you whether she is ready.", "The Resources tab has the 5 Rs for patients who aren't ready yet.", "At her readiness level, think about whether a quit date and medicines fit today."],
      4: NOTE_HINTS
    },
    backup: {
      1: ["On my exam she has leukoplakia, white patches that can't be wiped off, on the lining of her cheeks, and I plan a biopsy. Looking at her Medications tab, what would pharmacy counsel her on to protect her mouth?"],
      2: ["If you were the first health professional to see her, which two referrals would you make, and why?", "Which of those two would you make first, and why?"],
      3: ["Let's build her tobacco plan one A at a time. Ask: what would you ask Lucy about her smoking?",
          "Leukoplakia is often linked to tobacco irritation and raises her oral cancer risk, which matters with her mother's history. Advise: which personal benefits of quitting would you stress for Lucy?",
          "Assess: what does her readiness score of 5 out of 10 mean for the plan?",
          "Assist: given her readiness, what would your plan include today?",
          "Arrange: what follow-up would you set up for her?"],
      4: ["Here is the dental part of our joint note. Dentistry: biopsy of the leukoplakia, gentle oral hygiene with a soft brush while the sores heal, and advice to stop tobacco now. Please type the rest of the note as two lines, Pharmacy: and Follow-up:, with every referral under Follow-up.",
          "Thank you, that works as our joint note. Please click \"Finish Lucy and debrief\" below."]
    },
    selfCheck: ["Did you counsel her on using Symbicort in a way that protects her mouth?", "Were your top 2 referrals tied to her biggest needs, with a reason for each?", "Did your plan match her readiness (5/10), using the 5 Rs rather than a quit date, and letting her know medicines are there when she is ready?", "Does your joint note list every referral under Follow-up?"]
  },

  brian: {
    name: "Brian", tag: "Case 2", initials: "BR", mrn: "SIM-0418", age: "31 y · M",
    flags: ["Former smoker, 4 wks", "Tooth pain"],
    match: "Match the plan to where he is now: 4 weeks smoke-free, with strong cravings.",
    scenario: "Brian is a 31-year-old male who comes into clinic today complaining of severe tooth pain in his mouth's back left quadrant. This pain started a few days ago. He has taken acetaminophen and had some pain relief. Brian is a former smoker who has been smoke-free for 4 weeks now. When asked about his motivation to remain abstinent from tobacco he says he is a \"9\" out of \"10\". Since quitting smoking, he has gained about 10 lbs., and he feels like his allergies are worse. He is also having strong cravings for a cigarette because he is going through a stressful divorce. Brian admits to having trouble remembering to take his medications.",
    info: [
      ["Medical history", ["Allergic rhinitis", "Nasal polyps", "Hypothyroidism"]],
      ["Family history", ["Married, 2 children (10 and 8); in the process of divorce", "Mother: alive at 61; hypothyroidism", "Father: alive at 64; HTN, allergic rhinitis"]],
      ["Social history", ["Tobacco: former menthol, ½ ppd from age 24; used to smoke within 30 min of waking; quit to be a role model for his kids", "Alcohol: 2–4 beers on weekends", "Diet: chicken, steak, mashed potatoes, French fries; few vegetables", "Exercise: basketball after work, harder with allergies", "Lives with wife and 2 children (all nonsmokers)", "Occupation: engineer at a small tech company"]],
      ["Dental", ["Dental exam today with Maya Chen, D2. Findings and plan: ask Maya in Secure Chat."]],
      ["Physical exam", ["Ht 177.8 cm · Wt 113 kg · BMI 35.9", "BP 120/80 · P 62", "Renal and liver function within normal limits"]]
    ],
    meds: [
      ["Flonase (fluticasone propionate)", "1 spray each nostril daily", "Allergic rhinitis"],
      ["Synthroid (levothyroxine) 100 mcg", "PO once daily", "Hypothyroidism"],
      ["Montelukast 10 mg", "PO once daily in the evening", "Allergic rhinitis"],
      ["Varenicline 1 mg", "PO BID with food", "Smoking cessation"],
      ["Acetaminophen (self-reported)", "As needed for tooth pain", "Tooth pain"]
    ],
    tobacco: [
      ["Motivation to stay quit", "9 / 10", "0–2 not ready · 3–5 unsure · 6–9 ready · 10 trying"],
      ["Time to first cigarette (before quitting)", "Within 30 minutes of waking", "5–30 min = 2 points on Fagerström item 1"],
      ["Exhaled CO", "4 ppm", "Non-smoker <6 ppm · 1–4 ppm is normal"],
      ["Status", "Smoke-free 4 weeks, on varenicline", ""],
      ["Since quitting", "Gained ~10 lb; strong cravings with divorce stress", ""]
    ],
    intro: "Last one is Brian. He's in a lot of tooth pain and is 4 weeks smoke-free. What stands out to you from pharmacy?",
    hints: {
      1: ["The Medications tab shows varenicline and his allergy medicines, and the scenario says he forgets doses.", "Ask Maya what is causing his tooth pain and what she plans to do about it."],
      2: ["Patient Info and the scenario describe his family situation and stress.", "Pick the two referrals that tie to his biggest needs, and give a reason for each."],
      3: ["He has already quit: look at Assist in the 5 As (Resources tab) for what fits someone who recently quit.", "The Tobacco tab shows his motivation and what has happened since he quit.", "For breakthrough cravings, compare the NRT table with his medical history and his sore tooth."],
      4: NOTE_HINTS
    },
    backup: {
      1: ["On my exam he has irreversible pulpitis, an inflamed nerve that won't heal on its own, in his lower left first molar, so I plan a root canal or extraction. What would pharmacy do about his pain and his missed medication doses?"],
      2: ["If you were the first health professional to see him, which two referrals would you make, and why?", "Which of those two would you make first, and why?"],
      3: ["Let's build his plan one A at a time. Ask: what would you ask Brian about his tobacco use and cravings now?",
          "Staying smoke-free will help his gums heal after scaling and root planing, a deep cleaning below the gumline. Advise: what would you say to reinforce his quit?",
          "Assess: what do his motivation of 9 out of 10 and his 4 smoke-free weeks mean for the plan?",
          "Assist: what would you add to help with his cravings, and which form would suit him on top of varenicline?",
          "Arrange: what follow-up would you set up for him?"],
      4: ["Here is the dental part of our joint note. Dentistry: treat the lower left first molar first (root canal or extraction), then scaling and root planing for his periodontitis, with oral hygiene instruction. Please type the rest of the note as two lines, Pharmacy: and Follow-up:, with every referral under Follow-up.",
          "Thank you, that works as our joint note. Please click \"Finish Brian and debrief\" below."]
    },
    selfCheck: ["Did you help with his missed doses and explain how to take varenicline?", "Were your top 2 referrals tied to his biggest needs, with a reason for each?", "Did your plan focus on relapse prevention, with a plan for cravings that fits his medical history?", "Does your joint note list every referral under Follow-up?"]
  }
};

(typeof window !== "undefined" ? window : globalThis).IPE_DATA = { ORDER, STAGES, FIVE_A, TEAM_INTRO, TEAM_BACKUP, stepText, CASES };
})();
