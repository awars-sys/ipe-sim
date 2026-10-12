// Patient cases, rubrics, hints and reference scales (version 5.0).
// Shared by the page (index.html) AND the server function, so edit them in one place.

/* =====================================================================
   REFERENCE SCALES (shown in the Tobacco tab and IPE Resources)
   ===================================================================== */
export const LINKS = {
  ftnd: "https://www.aarc.org/wp-content/uploads/2014/08/Fagerstrom_test.pdf",
  co: "https://www.asthmaandlung.org.uk/symptoms-tests-treatments/tests/exhaled-carbon-monoxide",
  ready: "https://casaa.unm.edu/assets/inst/readiness-ruler.pdf",
  fiveD: "https://www.rwjbh.org/blog/2025/may/manage-nicotine-craving-with-the-5-ds-of-quittin/"
};
function bands(list, hit){
  return `<div class="bands">${list.map((b,i)=>`<span class="${i===hit?"hit":""}">${b}</span>`).join("")}</div>`;
}
const FTND = ["1–2 = low dependence","3–4 = low to moderate dependence","5–7 = moderate dependence","8+ = high dependence"];
const ftndRef = (score) => bands(FTND, score==null?-1:score<=2?0:score<=4?1:score<=7?2:3) + `<span class="src">Fagerström Test<sup>1</sup></span>`;
const CO = ["1–4 ppm: low, normal even in non-smokers","5–9 ppm: mild, may smoke or be exposed to second-hand smoke","10+ ppm: high, common if you smoke"];
const coRef = (ppm) => bands(CO, ppm<5?0:ppm<10?1:2) + `<span class="src">Exhaled CO test<sup>2</sup> · case sheet: &lt;6 ppm non-smoker</span>`;
const TTFC = ["Within 5 minutes = 3 points","5–30 minutes = 2 points","31–60 minutes = 1 point"];
const ttfcRef = (i) => bands(TTFC, i) + `<span class="src">Fagerström item 1<sup>1</sup></span>`;
const CPD = ["10 or less = 0 points","11–20 = 1 point","21–30 = 2 points","31 or more = 3 points"];
const cpdRef = (i) => bands(CPD, i) + `<span class="src">Fagerström item 4<sup>1</sup></span>`;
const READYB = ["0–2 = not ready to change","3–5 = unsure (ambivalent)","6–9 = ready to change","10 = already trying to change"];
const readyRef = (score, note) => bands(READYB, score<=2?0:score<=5?1:score<=9?2:3) + `<span class="src">Readiness ruler<sup>3</sup>${note?" · "+note:""}</span>`;

/* Referral types used to check "names 3 referrals" (no ranking needed) */
const REFS = [/dent/i,/pharmac/i,/primary care|\bpcp\b|physician|\bdoctor\b/i,/counsel|psycholog|therap/i,/psychiat/i,/dietit|dietic|nutrition/i,/social work/i,/pulmon/i];
const threeRefs = (who) => ({id:"three",label:"Names 3 referrals or consultations",count:REFS,min:3,ack:"Good, that's three solid referrals.",
  hints:[`Which professionals would you want on ${who}'s team? Try to name three.`,"Think beyond pharmacy and dentistry. Who else could help with the other things going on in the case?","Possible referrals include dental, pharmacy, primary care, counselor, psychiatrist, dietitian and social worker. Which three fit best?"]});
const whyPoint = (extra) => ({id:"why",label:"Explains the reason for each referral",re:new RegExp("because|since|due to|given|so that|so (she|he)|as (she|he)|to (help|treat|address|manage|refit|review|start|support)|for (her|his)|risk"+(extra?"|"+extra:""),"i"),ack:"Thanks for explaining your reasoning.",
  hints:["Can you tell me why you picked those three?","What would each referral do for the patient?","Give one reason for each of your three referrals."]});

/* =====================================================================
   CASE DATA + RUBRICS
   Lucy: Chatbot Prompt answer key (CO 24 ppm used throughout).
   Margaret: Case 3 Facilitator Guide with solutions.
   Brian: DRAFT key written for testing. Faculty to confirm.
   Each rubric point: id, label, re (keywords for the practice engine),
   ack (Maya's line when it's covered), hints (light, clear, strong).
   Info values can be a string or a list of lines.
   ===================================================================== */
export const CASES = {
lucy: {
  tab:"Lucy", tag:"Case 1", initials:"LT", mrn:"SIM-0412", age:"49 y.o. Female", draft:false, pron:"her",
  flags:[["Current smoker","warn"],["Oral lesion","warn"]],
  problems:["Leukoplakia, buccal mucosa","Asthma, well controlled","Generalized anxiety disorder","Hypertension","Gingivitis"],
  tobacco:["5 cigarettes/day (was 1 ppd)","First cigarette on waking","CO <b class='abn'>24 ppm</b>","Readiness 5/10"],
  scenario:"Lucy is a 49-year-old female who presents to clinic today complaining of sore, white patches in her mouth and experiences pain when brushing her teeth or eating hard foods. The sores are preventing her from practicing good oral hygiene. She is currently smoking 5 cigarettes/day. She quit smoking for 2 weeks but recently lost her job and now feels very anxious. Prior to quitting smoking, she smoked a pack of cigarettes every day. Lucy says she is a \"5\" out of \"10\" for readiness to quit smoking in the next 30 days. She has not had to use her albuterol this week. She reports good adherence with her other medications. She does not report any shortness of breath or nighttime symptoms of asthma.",
  encounters:[["Today","Office Visit","Dental Clinic","Maya Chen, D2","Sore white patches, pain when brushing or eating"],["Today","IPE Consult","Pharmacy","You","Consult requested by dental"]],
  info:[["Name","Lucy"],["Age","49-years-old"],["Gender","Female"],
    ["Medical history",["Generalized anxiety disorder","Gingivitis","Asthma, well controlled","Hypertension"]],
    ["Family history",["Mother: alive at 79; head and neck squamous cell carcinoma, HTN, hyperlipidemia","Father: alive at 81; HTN, DM, Asthma","Single, no children"]],
    ["Social history",["Tobacco: started age 14; 5-20 non-menthol cigarettes/day, first cigarette immediately after waking","Triggers: stress, other smokers","Previous quit smoking attempts: quit smoking for 2 weeks recently (“cold turkey”, with no medications)","Reason for relapse- lost her job and started smoking again.","Alcohol and illicit: smokes marijuana daily to help with anxiety","Diet: chicken, veggies, and pasta, candy at night while watching TV","Candy/sweets consumption has increased since she tried to quit smoking","Living environment: lives alone but frequently spends time with her neighbor, who smokes","Occupation: unemployed"]],
    ["Dental history","Leukoplakia – white patches on buccal mucosa. Painful while brushing and eating."],
    ["Drug history",["Albuterol 90 mcg HFA, 2 inhalations every 4-6 hours as needed for shortness of breath","Symbicort (budesonide/formoterol 160/4.5 mcg) 2 inhalations twice daily","Zoloft (sertraline) 50 mg PO once daily","Lisinopril 20 mg PO once daily"]],
    ["Physical exam",["Ht 175.3 cm Wt 99.8 kg BMI 32.5","BP 130/80 P 90","Renal and liver function within normal limits","Carbon monoxide 24 ppm (<6 ppm non- smoker)","Intraoral examination shows signs of leukoplakia on buccal mucosa."]],
    ["Occupation","Unemployed (ex-Factory worker)"]],
  meds:[["Albuterol 90 mcg HFA","2 inhalations every 4-6 hours as needed for shortness of breath","Asthma"],["Symbicort (budesonide/formoterol 160/4.5 mcg)","2 inhalations twice daily","Asthma"],["Zoloft (sertraline) 50 mg","PO once daily","Anxiety"],["Lisinopril 20 mg","PO once daily","Hypertension"]],
  flow:[["Smoking status","Current, 5 cigarettes/day (range 5–20; was 1 pack/day before her quit attempt)",cpdRef(0)],
    ["Time to first cigarette","Immediately after waking",ttfcRef(0)],
    ["Exhaled CO","<span class='abn'>24 ppm</span>",coRef(24)],
    ["Readiness to quit (next 30 days)","5 / 10",readyRef(5)],
    ["Fagerström score","Not given in this case",ftndRef(null)],
    ["Past quit attempts","2 weeks, cold turkey, no medicines; relapsed after job loss",""],
    ["Triggers","Stress, other smokers",""],
    ["Other substances","Marijuana daily for anxiety",""]],
  intro:"Hi! I'm Maya Chen, the D2 dental student on Lucy's care team. I just saw her for those painful white patches on her buccal mucosa, and we're treating it as leukoplakia, so her smoking really worries me. Before I share the dental side: is there anything you noticed as a student pharmacist to assess her needs?",
  reflectOn:"managing a patient struggling with socioeconomic setbacks and substance relapse",
  qs:[
    { step:0, label:"Scope of practice", text:"Is there anything you noticed as a student pharmacist to assess Lucy's needs?",
      ask:null,
      must:["rinse","thrush"],
      points:[
        {id:"rinse",label:"Rinse and spit after each Symbicort dose",re:/rins|spit|gargl|swish/i,ack:"Yes, rinsing and spitting after Symbicort is a great catch.",
          hints:["Take another look at her medication list. Is anything she inhales every day relevant to her mouth pain?","Her Symbicort contains an inhaled steroid. What could you counsel her to do right after each dose?","Think about the steroid left in her mouth after each Symbicort puff. What simple step after every dose would clear it?"]},
        {id:"thrush",label:"Links the inhaled steroid to oral thrush",re:/thrush|candid|fung|yeast/i,ack:"Good, thrush on top of her leukoplakia would make her mouth pain even worse.",
          hints:["What oral side effect could her inhaled steroid cause?","Inhaled steroids can lead to an infection in the mouth. Which one?","The steroid in Symbicort can cause a fungal infection in the mouth. How would that affect her sores?"]},
        {id:"spacer",label:"Suggests a spacer",re:/spacer|chamber|valved/i,ack:"A spacer is a nice addition too.",
          hints:["Is there a device that could cut down how much medicine lands in her mouth?","Some patients use an add-on device with their inhaler to reduce what deposits in the mouth. Would that help Lucy?","Would a spacer make sense with her Symbicort?"]},
        {id:"tech",label:"Reviews inhaler technique",re:/techniq|prim(e|ing)|shake|breath|exhale|inhaler (use|counsel)/i,ack:"Checking her technique overall is smart.",
          hints:["Beyond side effects, what else about her inhaler use could you check?","When did someone last watch her use her inhalers?","Inhaler technique pointers like priming and breathing could help. Would you review them?"]}
      ],
      pass:"That's exactly the kind of pharmacy input I was hoping for.",
      share:"Here's what a complete pharmacy answer covers: counsel her to rinse and spit after every Symbicort dose, because it limits the steroid left in her mouth and helps prevent oral thrush, which would worsen her mouth pain. A spacer also lowers the risk, and it's worth reviewing her inhaler technique (priming, breathing, holding her breath).",
      perspective:"From the dental side, leukoplakia shows up as white or gray patches, often because something like tobacco is irritating the mouth, and it can raise her risk of oral cancer, which matters even more with her mom's head and neck cancer. I'll do a biopsy, since that's the only way to know whether it could become cancer, and I'll advise her to stop tobacco now."
    },
    { step:1, label:"Referrals", text:"If you are the first health professional to encounter Lucy, which referrals or consultations would you make? Name your top 3 and explain why.",
      ask:"Next one. If you were the first health professional to see Lucy, which referrals or consultations would you make? Name your top 3 and tell me why.",
      must:["three","dental","mental","why"],
      points:[
        threeRefs("Lucy"),
        {id:"dental",label:"Includes dental (biopsy of the leukoplakia)",re:/dent|biops|oral (surg|med)/i,ack:"Agreed, the biopsy can't wait.",
          hints:["Which of her problems could be the most serious if it waited?","Her white patches need a definite diagnosis. Who would you send her to?","Leukoplakia needs a biopsy. Is dentistry on your list?"]},
        {id:"mental",label:"Includes a counselor or psychiatrist for anxiety",re:/counsel|psych|therap|mental|behavio/i,ack:"Good call on support for her anxiety.",
          hints:["What's driving her relapse right now?","She's anxious after losing her job and uses marijuana for anxiety. Who could help with that?","Would a counselor or psychiatrist belong in your top 3?"]},
        {id:"pharm",label:"Includes pharmacy (inhaler counseling, cessation support)",re:/pharmac/i,ack:"And pharmacy has a clear role too.",
          hints:["Where does your own profession fit?","Who would handle her Symbicort counseling and cessation medicines later on?","Would you include pharmacy?"]},
        whyPoint("cancer|relapse|anxiety|driv")
      ],
      pass:"I like those choices.",
      share:"Here's how a complete answer could look: possible referrals are dental, pharmacy, primary care, counselor, psychiatrist, dietitian and social worker. A strong top 3 is dental (biopsy of the leukoplakia), pharmacy (Symbicort counseling and cessation support), and a counselor or psychiatrist for her anxiety, each with a reason.",
      perspective:"I'd definitely include dental, because the biopsy tells us whether this could become oral cancer. Her anxiety is what pulled her back to smoking, so counseling or psychiatry belongs in there too."
    },
    { step:2, part:"A", label:"Treatment plan · Part A: Time to first cigarette",
      text:"Open the Tobacco tab. Lucy smokes her first cigarette immediately after waking. What does that tell you about her nicotine dependence? (Lucy has no Fagerström score, so time to first cigarette is the best marker.)",
      ask:"Let's work through her tobacco numbers together, one at a time. Pull up the Tobacco tab. First: Lucy has her first cigarette right after she wakes up. What does that tell you about her nicotine dependence?",
      must:["depend"],
      points:[
        {id:"depend",label:"High nicotine dependence (first cigarette within 5 minutes scores highest on Fagerström item 1)",re:/depend|addict|high|strong|heav|physical|within 5|3 points/i,ack:"Exactly, smoking on waking is a strong sign of high dependence.",
          hints:["Look at the reference values next to her time to first cigarette. How many points is that on the Fagerström scale?","Within 5 minutes of waking scores the highest on that Fagerström item. What does that suggest about her dependence?","Smoking right after waking usually means strong physical dependence. How would you describe hers?"]},
        {id:"crave",label:"Expects strong cravings or withdrawal when she quits",re:/crav|withdraw|urge/i,ack:"Good, that tells us she'll likely have strong cravings when she quits.",
          hints:["What might she feel when she tries to stop?","What happens to someone this dependent in the first days without a cigarette?","High dependence usually means strong cravings and withdrawal. Would you expect that for Lucy?"]}
      ],
      pass:"That's how I read it too.",
      share:"Her first cigarette right after waking scores 3 points, the highest, on the first Fagerström item. That points to high physical nicotine dependence, so she'll likely have strong cravings and withdrawal when she tries to quit.",
      perspective:null
    },
    { step:2, part:"B", label:"Treatment plan · Part B: CO level",
      text:"Lucy's exhaled CO is 24 ppm. What does that tell you?",
      ask:"Next number: her exhaled CO is 24 ppm. What does that tell you?",
      must:["high"],
      points:[
        {id:"high",label:"CO 24 ppm is high (10+ ppm): she is smoking now or very recently",re:/high|elevat|above|over|10\+|abnormal|current|recent|active/i,ack:"Right, 24 ppm is well into the high range, so she's actively smoking.",
          hints:["Check the CO reference values in the Tobacco tab. Which range does 24 ppm fall in?","10 ppm and over is high. What does a reading of 24 say about her recent smoking?","24 ppm is far above the non-smoker cut-off of under 6. Is she smoking now?"]},
        {id:"use",label:"Uses the CO reading as feedback to motivate her or track progress",re:/track|monitor|progress|motivat|show her|feedback|baseline|compare|recheck|re-?test/i,ack:"Nice, showing her the number can be a motivator too.",
          hints:["Could the CO reading be useful when you talk with her?","How could you use this number at her next visit?","Showing patients their CO level, and how fast it drops after quitting, can motivate them."]}
      ],
      pass:"Agreed.",
      share:"A CO of 24 ppm is in the high range (10 ppm and over) and far above the non-smoker cut-off of under 6 ppm, so she is smoking now. It's also a good motivator: CO drops quickly after quitting, so we can recheck it to show her progress.",
      perspective:null
    },
    { step:2, part:"C", label:"Treatment plan · Part C: Readiness to quit",
      text:"Lucy rates her readiness to quit in the next 30 days as 5 out of 10. What does that tell you?",
      ask:"Last number: she says she's a 5 out of 10 on readiness to quit in the next 30 days. What does that tell you?",
      must:["unsure"],
      points:[
        {id:"unsure",label:"Unsure or ambivalent about quitting (contemplation), not ready for a quit date",re:/unsure|ambivalen|contemplat|not ready|on the fence|undecided|thinking about|mixed|torn|middle|half/i,ack:"Yes, 5/10 means she's unsure.",
          hints:["Check the readiness reference values in the Tobacco tab. Where does 5 fall?","3 to 5 on the readiness ruler means unsure. What stage of change does that suggest?","A 5/10 means she's ambivalent. Is she ready to set a quit date?"]},
        {id:"approach",label:"So build her motivation first rather than pushing a quit date",re:/motivat|5 ?r|five r|not (push|force|rush)|explore|interview/i,ack:"Right, building motivation comes first.",
          hints:["What would you focus on first with someone who's unsure?","Would you push a quit date, or work on her reasons first?","With an unsure patient, building motivation comes before a quit plan."]}
      ],
      pass:"Exactly how I'd read it.",
      share:"A 5/10 is in the unsure range (3 to 5) on the readiness ruler. She's ambivalent, in the contemplation stage, so she isn't ready to set a quit date yet. The first step is building her motivation.",
      perspective:null
    },
    { step:2, part:"D", label:"Treatment plan · Part D: Your approach",
      text:"Based on these scores, how would you approach Lucy's treatment plan? Use the 5 As, and the 5 Rs where they fit.",
      ask:"So putting it together: high dependence, a CO of 24 ppm and only 5/10 on readiness. How would you approach her treatment plan? Use the 5 As, and the 5 Rs where they fit her.",
      must:["fiveR"], minMet:2,
      flag:{re:/quit date|set a date|(start|begin) (her )?(on )?(the )?(patch|varenicline|chantix|bupropion|nrt)/i,msg:"Hmm, she's only a 5/10. Would she really follow a quit date or start a medicine right now? How could we work with her ambivalence first?"},
      points:[
        {id:"fiveR",label:"Assist: 5 Rs / motivational approach, no forced quit date",re:/5 ?r|five r|relevan|roadblock|reward|repetition|motivation(al)? interview|\bmi\b/i,ack:"The 5 Rs fit her really well.",
          hints:["For someone who isn't ready yet, which counseling framework fits better than a quit plan?","There's a 5-part approach for patients who are ambivalent about quitting. It's in the IPE Resources tab.","Think Relevance, Risks, Rewards, Roadblocks and Repetition. How would you use them with Lucy?"]},
        {id:"advise",label:"Advise: clear, personal advice to quit",re:/advis|benefit|health|cancer|asthma|blood pressure/i,ack:"Linking quitting to her own health makes the advice stick.",
          hints:["What would you advise her, and how would you make it personal?","How might quitting help her mouth, asthma or blood pressure?","Connect the advice to her sores and her mom's cancer history."]},
        {id:"later",label:"Lets her know medicines are available when she's ready",re:/when (she'?s|she is) ready|medic|nrt|patch|pharmacotherap|options?/i,ack:"Good, keeping that door open matters.",
          hints:["What could you offer her for later?","Is there help for cravings you could mention, without pushing it now?","Letting her know medicines are there when she's ready keeps the door open."]},
        {id:"arrange",label:"Arrange: quitline, resources or specialist follow-up",re:/quitline|quit ?now|800|refer|follow|specialist|clinic|resource/i,ack:"Good, having follow-up lined up matters.",
          hints:["What would you arrange for after today?","Which resources could she use between visits?","A quitline number and a referral to a cessation clinic would cover Arrange."]}
      ],
      pass:"That's a really thoughtful plan for where she is right now.",
      share:"Here's a complete plan. Ask: we already know her smoking history. Advise: quitting will help her mouth, asthma and blood pressure, and nicotine withdrawal adds to stress. Assess: she's in contemplation; smoking on waking shows high dependence, CO 24 ppm is high, and 5/10 shows ambivalence. Assist: use the 5 Rs (what she likes and dislikes about smoking, her goals like a new job and saving money, what helped her quit before, whether her neighbor might quit with her) and let her know medicines are there when she's ready, rather than forcing a quit date. Arrange: quitline or online resources and a referral to a cessation clinic.",
      perspective:"Chairside, I can keep reinforcing the 5 Rs, especially how smoking affects her mouth sores, and remind her that help with cravings is there when she's ready."
    },
    { step:3, label:"Joint plan", text:"Write a brief joint summary plan for Lucy's file.",
      ask:"Let's wrap up. Can you write a brief joint summary plan for Lucy's file, covering what pharmacy and dentistry will each do?",
      must:["pharm","dent","tob"],
      points:[
        {id:"pharm",label:"Pharmacy's part (Symbicort counseling, thrush prevention)",re:/symbicort|thrush|rins|spacer|inhaler|pharmac/i,ack:"",hints:["What will pharmacy do for her?","Include your Symbicort counseling.","Add the rinse-and-spit and spacer advice for pharmacy."]},
        {id:"dent",label:"Dentistry's part (biopsy, oral care)",re:/biops|leukoplak|dent|oral exam/i,ack:"",hints:["What will dentistry do?","Don't forget my part of the plan.","Add the biopsy of the leukoplakia."]},
        {id:"ref",label:"Referral to counseling or psychiatry",re:/refer|counsel|psych|mental/i,ack:"",hints:["Who else is on her team?","Add the referral for her anxiety.","Include counseling or psychiatry."]},
        {id:"tob",label:"Tobacco plan (5 Rs while ambivalent)",re:/5 ?r|motivat|cessation|quit|readiness|ambivalen/i,ack:"",hints:["What's the plan for her smoking?","Summarize the tobacco plan.","Add the 5 Rs approach for now."]},
        {id:"follow",label:"Follow-up arranged",re:/follow|arrange|quitline|reassess|next visit|check in/i,ack:"",hints:["When will we see her again?","Add a follow-up.","Include the quitline or a follow-up visit."]}
      ],
      pass:"Perfect, that's a clear plan for her chart.",
      share:"Here's a joint plan we could file: Pharmacy will counsel Lucy to rinse and spit after each Symbicort dose, consider a spacer and review inhaler technique. Dentistry will biopsy the leukoplakia and support her oral hygiene. We'll refer her to a counselor or psychiatrist for anxiety, use the 5 Rs while she's ambivalent, and arrange quitline resources and follow-up.",
      perspective:null
    }
  ]
},
brian: {
  tab:"Brian", tag:"Case 2", initials:"BR", mrn:"SIM-0418", age:"31 y.o. Male", draft:true, pron:"his",
  flags:[["Former smoker, 4 wks","warn"],["Tooth pain","warn"],["Draft key","draft"]],
  problems:["Cavitated lower left first molar","Generalized periodontitis","Allergic rhinitis, nasal polyps","Hypothyroidism"],
  tobacco:["Smoke-free 4 weeks","On varenicline","CO 4 ppm","Motivation 9/10"],
  scenario:"Brian is a 31-year-old male who comes into clinic today complaining of severe tooth pain in his mouth's back left quadrant. This pain started a few days ago. He has taken acetaminophen and had some pain relief. Brian is a former smoker who has been smoke-free for 4 weeks now. When asked about his motivation to remain abstinent from tobacco he says he is a \"9\" out of \"10\". Since quitting smoking, he has gained about 10 lbs., and he feels like his allergies are worse. He is also having strong cravings for a cigarette because he is going through a stressful divorce. Brian admits to having trouble remembering to take his medications.",
  encounters:[["Today","Urgent Visit","Dental Clinic","Maya Chen, D2","Severe pain, back left quadrant, started a few days ago"],["Today","IPE Consult","Pharmacy","You","Consult requested by dental"]],
  info:[["Name","Brian"],["Age","31-year-old"],["Gender","Male"],
    ["Medical history",["Allergic rhinitis","Nasal polyps","Hypothyroidism"]],
    ["Family history",["Married and has 2 children. He is currently in the process of divorce.","Mother: alive at 61; hypothyroidism","Father: alive at 64; HTN, allergic rhinitis"]],
    ["Social history",["Tobacco: Former menthol cigarettes ½ ppd started smoking age 24, previously would smoke within 30 minutes of waking; Quit smoking to be a good role model for his children (10 and 8 years old)","Alcohol/Illicit drugs; 2-4 beers on the weekends","Diet: chicken, steak, mashed potatoes, and French fries, little to no vegetables","Exercise: plays basketball outside after work, but allergies are making exercise challenging","Living environment: Lives with wife and 2 children (all nonsmokers)","Occupation: engineer at a small tech company"]],
    ["Dental history","Generalized periodontitis and cavitated lower left first molar"],
    ["Drug history",["Flonase (fluticasone propionate): 1 spray in each nostril daily","Synthroid (levothyroxine sodium): 100 mcg PO once daily","Montelukast: 10 mg PO once daily in the evening","Varenicline: 1 mg PO BID with food"]],
    ["Physical exam",["Ht 177.8 cm Wt 113 kg BMI 35.9","BP 120/80 P 62","Carbon monoxide 4 ppm (<6 ppm non-smoker)","Renal and liver function within normal limits","Intraoral examination reveals generalized periodontitis and cavitated lesion on left lower molar."]]],
  meds:[["Flonase (fluticasone propionate)","1 spray in each nostril daily","Allergic rhinitis"],["Synthroid (levothyroxine sodium) 100 mcg","PO once daily","Hypothyroidism"],["Montelukast 10 mg","PO once daily in the evening","Allergic rhinitis"],["Varenicline 1 mg","PO BID with food","Smoking cessation"]],
  flow:[["Smoking status","Former smoker, smoke-free 4 weeks (was ½ ppd menthol)",cpdRef(0)],
    ["Time to first cigarette (before quitting)","Within 30 minutes of waking",ttfcRef(1)],
    ["Exhaled CO","4 ppm",coRef(4)],
    ["Motivation to stay quit","9 / 10",readyRef(9,"he has already quit, so this rates his motivation to stay quit")],
    ["Fagerström score","Not given in this case",ftndRef(null)],
    ["Current cessation medicine","Varenicline 1 mg BID",""],
    ["Since quitting","Gained about 10 lbs; strong cravings with divorce stress",""]],
  intro:"Hi! I'm Maya Chen, the D2 dental student on Brian's team. He came in with severe pain in his back left molar, and I found a cavitated lesion on his lower left first molar plus generalized periodontitis. He's 4 weeks smoke-free, which is great, but he's under a lot of stress. Is there anything you noticed as a student pharmacist to assess his needs?",
  reflectOn:"helping a patient stay smoke-free through major life stress",
  qs:[
    { step:0, label:"Scope of practice", text:"Is there anything you noticed as a student pharmacist to assess Brian's needs?",
      ask:null, must:["adh","var"],
      points:[
        {id:"adh",label:"Adherence support for missed doses",re:/adher|remind|pill ?(box|organi)|alarm|routine|forget|calendar|app\b/i,ack:"Memory aids could really help him.",
          hints:["He mentioned something about taking his medicines. What stood out?","Brian says he has trouble remembering his meds. What could you do about that?","With four daily medicines, which tools or routines could help him remember each dose?"]},
        {id:"var",label:"Varenicline counseling (keep taking it, full course)",re:/varenicline|chantix/i,ack:"Good, keeping him on varenicline matters a lot right now.",
          hints:["Which medicine on his list is helping him stay smoke-free?","He's on varenicline. What would you counsel him on, given he's only 4 weeks in?","Think about how long a varenicline course runs and what happens if he misses doses."]},
        {id:"crave",label:"Short-acting NRT for breakthrough cravings",re:/nrt|nicotine (gum|lozenge)|gum|lozenge|crav|short.?acting/i,ack:"Having something for breakthrough cravings is a smart idea.",
          hints:["Is there anything that could help with his strong cravings?","Some patients add a short-acting product during stressful times.","Would short-acting NRT for breakthrough cravings fit here?"]},
        {id:"allergy",label:"Reviews allergy medicines (Flonase, montelukast)",re:/flonase|fluticasone|montelukast|singulair|allerg|nasal/i,ack:"Good to look at his allergy treatment too.",
          hints:["He says his allergies feel worse. Anything there for pharmacy?","Would you check how he's using his nasal spray?","Montelukast carries a warning about mood changes. Worth watching with his stress?"]},
        {id:"pain",label:"Pain management advice",re:/acetaminophen|tylenol|ibuprofen|nsaid|analges|pain/i,ack:"Thanks for thinking about his pain.",
          hints:["He's in a lot of pain. Anything you'd add?","He's taken acetaminophen with some relief. Would you suggest anything else until his dental visit?","A short-term pain plan would help him get to treatment."]}
      ],
      pass:"That's really helpful from the pharmacy side.",
      share:"Here's what a complete answer could cover: adherence support (pill organizer, phone reminders, pairing doses with daily routines), counseling to keep taking varenicline as prescribed for the full course, and possibly short-acting NRT for breakthrough cravings. You could also add a short-term pain plan and a check of his allergy medicines.",
      perspective:"On the dental side, the cavitated lower left first molar is the likely cause of his pain, so he needs a restoration or possibly a root canal or extraction. His periodontitis needs scaling and root planing, and staying smoke-free will help his gums heal."
    },
    { step:1, label:"Referrals", text:"If you are the first health professional to encounter Brian, which referrals or consultations would you make? Name your top 3 and explain why.",
      ask:"Next one. If you were the first health professional to see Brian, which referrals or consultations would you make? Name your top 3 and tell me why.",
      must:["three","dental","stress","why"],
      points:[
        threeRefs("Brian"),
        {id:"dental",label:"Includes dental (tooth pain, periodontitis)",re:/dent|tooth|molar|root canal/i,ack:"Agreed, his pain needs dental care soon.",
          hints:["Which problem brought him in today?","He's in severe pain. Who treats that?","Is dentistry in your top 3?"]},
        {id:"stress",label:"Includes support for divorce stress (social worker or psychologist)",re:/psych|counsel|therap|social work|mental|stress|divorce/i,ack:"Yes, the divorce stress is his biggest relapse risk.",
          hints:["What's the biggest threat to him staying smoke-free?","He's going through a stressful divorce. Who could help?","Would a social worker or psychologist belong in your top 3?"]},
        {id:"pharm",label:"Includes pharmacy (adherence, varenicline)",re:/pharmac/i,ack:"And pharmacy can help with his adherence.",
          hints:["Where does your own profession fit?","Who would help with his missed doses and varenicline?","Would you include pharmacy?"]},
        whyPoint("relapse|pain|crav")
      ],
      pass:"I agree with those choices.",
      share:"Here's how a complete answer could look: possible referrals are dental, pharmacy, primary care, social worker or psychologist, dietitian and psychiatrist. A strong top 3 is dental (severe tooth pain and periodontitis), pharmacy (adherence and varenicline), and a social worker or psychologist (divorce stress is his biggest relapse risk), each with a reason.",
      perspective:"Dental has to be in there because he's in pain. Support for the divorce stress matters just as much, since that's what could pull him back to smoking."
    },
    { step:2, part:"A", label:"Treatment plan · Part A: Time to first cigarette",
      text:"Open the Tobacco tab. Before he quit, Brian smoked within 30 minutes of waking. What does that tell you about his nicotine dependence? (Brian has no Fagerström score, so time to first cigarette is the best marker.)",
      ask:"Let's work through his tobacco numbers together, one at a time. Pull up the Tobacco tab. First: before he quit, Brian smoked within 30 minutes of waking. What does that tell you about his nicotine dependence?",
      must:["depend"],
      points:[
        {id:"depend",label:"Moderate to high nicotine dependence (5–30 minutes = 2 points on Fagerström item 1)",re:/depend|addict|moderate|high|strong|physical|2 points/i,ack:"Right, that points to real physical dependence.",
          hints:["Look at the reference values next to his time to first cigarette. How many points is that on the Fagerström scale?","5 to 30 minutes after waking scores 2 out of 3 on that Fagerström item. What does that suggest?","Smoking within 30 minutes of waking shows physical dependence. How strong would you say his was?"]},
        {id:"risk",label:"Links his dependence to his cravings and relapse risk now",re:/crav|relapse|withdraw|urge|risk|varenicline/i,ack:"Good, that explains why his cravings are so strong right now.",
          hints:["How might his past dependence affect him now that he's quit?","He's having strong cravings. Does his dependence help explain that?","A dependent smoker 4 weeks out is still at real risk of relapse. Would you agree?"]}
      ],
      pass:"That's how I read it too.",
      share:"Smoking within 30 minutes of waking scores 2 points on the first Fagerström item, which points to moderate to high physical dependence. That helps explain his strong cravings now and why staying on varenicline matters.",
      perspective:null
    },
    { step:2, part:"B", label:"Treatment plan · Part B: CO level",
      text:"Brian's exhaled CO is 4 ppm. What does that tell you?",
      ask:"Next number: his exhaled CO is 4 ppm. What does that tell you?",
      must:["normal"],
      points:[
        {id:"normal",label:"CO 4 ppm is in the low, normal range (1–4 ppm): confirms he isn't smoking",re:/normal|low|non.?smok|abstin|not smok|smoke.?free|quit|confirm|below|under 6/i,ack:"Right, his CO of 4 is in the normal range, so he really is smoke-free.",
          hints:["Check the CO reference values in the Tobacco tab. Which range does 4 ppm fall in?","1 to 4 ppm is normal, even in non-smokers. What does that say about Brian?","His CO is under the non-smoker cut-off of 6. Does that confirm he's stayed quit?"]},
        {id:"praise",label:"Uses the reading to praise and reinforce his success",re:/prais|congrat|reinforc|motivat|encourag|proof|success|celebrat|great job/i,ack:"Nice, he deserves to hear that.",
          hints:["How could you use this result with Brian?","Would sharing the number with him help his motivation?","A normal CO is proof his quit is working. Would you tell him so?"]}
      ],
      pass:"Agreed.",
      share:"A CO of 4 ppm is in the low, normal range (1 to 4 ppm) and under the non-smoker cut-off of 6 ppm, which confirms he's not smoking. It's great evidence to praise his success.",
      perspective:null
    },
    { step:2, part:"C", label:"Treatment plan · Part C: Motivation to stay quit",
      text:"Brian rates his motivation to stay smoke-free as 9 out of 10. What does that tell you?",
      ask:"Last number: he says he's a 9 out of 10 on motivation to stay smoke-free. What does that tell you?",
      must:["motivated"],
      points:[
        {id:"motivated",label:"Highly motivated to stay quit (action stage)",re:/motivat|high|commit|confident|determin|action|maintenance|9/i,ack:"Yes, he's very committed.",
          hints:["Check the readiness reference values in the Tobacco tab. Where does 9 fall?","9 out of 10 is near the top of the scale. What does that say about his commitment?","He's already quit and rates himself 9/10. What stage of change is that?"]},
        {id:"risk",label:"But the divorce stress and cravings still put him at high relapse risk",re:/stress|divorce|relapse|crav|risk|trigger/i,ack:"Exactly, motivation alone won't carry him through the stress.",
          hints:["Is high motivation enough on its own here?","What's going on in his life that could pull him back to smoking?","His divorce and cravings are real relapse risks, even at 9/10. How would you factor that in?"]}
      ],
      pass:"Exactly how I'd read it.",
      share:"9/10 is near the top of the readiness ruler: he's highly motivated to stay quit and is in the action stage. But the divorce stress and strong cravings put him at high risk of relapse, so motivation alone isn't enough.",
      perspective:null
    },
    { step:2, part:"D", label:"Treatment plan · Part D: Your approach",
      text:"Based on these scores, how would you approach Brian's plan? He has already quit, so use the 5 As with a focus on preventing relapse.",
      ask:"So he's smoke-free, highly motivated, but under a lot of stress with strong cravings. Using the 5 As, how would you approach his plan to keep him smoke-free?",
      must:["relapse","meds"],
      flag:{re:/5 ?rs|five rs|relevance|roadblock/i,msg:"The 5 Rs are for people who aren't ready to quit yet. Brian has already quit. What does he need now to stay quit?"},
      points:[
        {id:"relapse",label:"Assist: relapse prevention (cravings, stress, triggers)",re:/relapse|crav|trigger|stress|cop|5 ?d|delay|distract/i,ack:"Yes, planning for stress and cravings is key.",
          hints:["What's the biggest risk for him right now?","How would you help him handle cravings when the divorce gets hard?","A plan for stress and triggers, like the 5 Ds, would help prevent relapse."]},
        {id:"meds",label:"Assist: continue varenicline, consider NRT for cravings",re:/varenicline|chantix|continue|12 ?weeks|nrt|gum|lozenge/i,ack:"Good, staying on his medicine is important.",
          hints:["What about his current cessation medicine?","Should he keep taking varenicline? For how long?","Continuing varenicline (and maybe short-acting NRT for cravings) supports him now."]},
        {id:"weight",label:"Addresses weight gain",re:/weight|diet|exercis|basketball/i,ack:"Nice that you picked up on the weight gain.",
          hints:["Is there another side effect of quitting he's worried about?","He's gained 10 lbs. Would you address that?","Diet and exercise tips could help with the weight gain."]},
        {id:"arrange",label:"Arrange: follow-up or quitline",re:/follow|quitline|800|check.?in|appointment/i,ack:"Good, regular check-ins will help.",
          hints:["What would you arrange after today?","When should we see him again?","A follow-up in 1 to 2 weeks and the quitline would cover Arrange."]}
      ],
      pass:"That's a solid plan to keep him smoke-free.",
      share:"Here's a complete plan. Ask: confirm he's still smoke-free. Advise: praise his quit and link it to his kids and his gums. Assess: CO 4 ppm confirms abstinence; he's highly motivated (9/10) but at high relapse risk from stress. Assist: keep taking varenicline for the full course (an extra 12 weeks can help prevent relapse), consider short-acting NRT for cravings, plan for stress and triggers with the 5 Ds, and give tips on weight gain. Arrange: follow-up in 1 to 2 weeks plus the quitline.",
      perspective:"I'll keep reinforcing his quit at each dental visit. His gums will heal better without smoking, which is a nice motivator."
    },
    { step:3, label:"Joint plan", text:"Write a brief joint summary plan for Brian's file.",
      ask:"Let's wrap up. Can you write a brief joint summary plan for Brian's file, covering what pharmacy and dentistry will each do?",
      must:["pharm","dent","tob"],
      points:[
        {id:"pharm",label:"Pharmacy's part (adherence, varenicline)",re:/varenicline|adher|remind|pharmac|nrt/i,ack:"",hints:["What will pharmacy do?","Include your adherence and varenicline plan.","Add pharmacy's part."]},
        {id:"dent",label:"Dentistry's part (molar, periodontitis)",re:/molar|tooth|cavit|perio|root|restor|dent|scaling/i,ack:"",hints:["What will dentistry do?","Don't forget my part.","Add treating the molar and his periodontitis."]},
        {id:"ref",label:"Referral for stress support",re:/refer|counsel|psych|social work/i,ack:"",hints:["Who else is on his team?","Add the stress support referral.","Include a social worker or psychologist."]},
        {id:"tob",label:"Relapse prevention plan",re:/relapse|smoke.?free|quit|crav/i,ack:"",hints:["What's the plan to keep him smoke-free?","Summarize the tobacco plan.","Add relapse prevention."]},
        {id:"follow",label:"Follow-up arranged",re:/follow|arrange|quitline|check.?in|next visit/i,ack:"",hints:["When will we see him again?","Add a follow-up.","Include a follow-up visit."]}
      ],
      pass:"Perfect, that's a clear plan for his chart.",
      share:"Here's a joint plan we could file: Dentistry will treat the cavitated lower left first molar and start periodontal therapy. Pharmacy will set up adherence aids, keep him on varenicline for the full course and add short-acting NRT for cravings if needed. We'll refer him to a social worker or psychologist for divorce stress and follow up in 1 to 2 weeks.",
      perspective:null
    }
  ]
},
margaret: {
  tab:"Margaret", tag:"Practice", initials:"MG", mrn:"SIM-0400", age:"68 y.o. Female", draft:false, practice:true, pron:"her",
  flags:[["Current smoker","warn"],["Ill-fitting dentures","warn"],["Weight loss","warn"],["Practice case","draft"]],
  problems:["COPD","Depression","Dry mouth","Halitosis","Edentulous, ill-fitting dentures"],
  tobacco:["10–15 menthol cigarettes/day","First cigarette within 30 min","Fagerström <b class='abn'>7</b> (moderate)","CO <b class='abn'>20 ppm</b>","Readiness 8/10"],
  scenario:"Margaret is a 68-year-old retired schoolteacher who complains of dry mouth, difficulty swallowing and bad breath. She says that her present dentures are ill-fitted and they move when she eats and speaks. She is worried about recent weight loss and does not want lung cancer. She is trying to quit smoking but is struggling with cravings and notices that she smokes more when she is feeling lonely. Margaret says she is an \"8\" out of \"10\" for readiness to quit smoking. She remembers how good she felt the last time she quit smoking, but she does not have the same support she had in the past, explaining why she is not a \"10\".",
  encounters:[["Today","Office Visit","Dental Clinic","Maya Chen, D2","Dry mouth, difficulty swallowing, bad breath, ill-fitting dentures"],["Today","IPE Consult","Pharmacy","You","Consult requested by dental"]],
  info:[["Name","Margaret"],["Age","68-years-old"],["Gender","Female"],
    ["Medical history",["Depression","COPD","Dry mouth","Halitosis"]],
    ["Family history","Husband passed away and she has two children and 5 grandchildren."],
    ["Social history",["Tobacco: started age 18 years; 10-15 menthol cigarettes/day. First cigarette within 30 minutes of waking. Fagerström score 7/10 (highly addictive), Triggers: after meals, with coffee, reading, gardening, before bed.","Quit smoking 2000-2002 with nicotine replacement gum 4 mg and 14 mg patches daily for 10 weeks. Relapsed after her husband died.","Denies alcohol or illicit drugs.","Diet: soft diet and convenient foods.","Living environment: She lives alone and has very few friends. Her children live in another state. She likes to garden and read.","Occupation: retired schoolteacher"]],
    ["Dental history",["Edentulous","She has been edentulous in the maxillary arch (upper jaw) for the past 10 years and had her mandibular arch (lower jaw) anterior incisors extracted about 8 months ago."]],
    ["Drug history",["Spiriva (tiotropium) 18 mcg 1 capsule for inhalation daily","Albuterol 90 mcg 2 inhalations PO q6h prn shortness of breath","Medicare insurance and supplemental covers all medications for tobacco dependence"]],
    ["Physical exam",["Ht 160 cm Wt 62.5 kg BMI 24.4 BP 90/60 HR 100","Carbon Monoxide 20 ppm (<6 ppm non- smoker)","Renal and liver function within normal limits","Intraoral examination reveals moderately inflamed oral tissues, consistent with an ill-fitted denture; however, the amount of alveolar bone present is adequate for denture support"]]],
  meds:[["Spiriva (tiotropium) 18 mcg","1 capsule for inhalation daily","COPD"],["Albuterol 90 mcg","2 inhalations PO q6h prn shortness of breath","COPD"],["Coverage","Medicare insurance and supplemental covers all medications for tobacco dependence",""]],
  flow:[["Smoking status","Current, 10–15 menthol cigarettes/day (started at 18)",cpdRef(1)],
    ["Time to first cigarette","Within 30 minutes of waking",ttfcRef(1)],
    ["Fagerström score","<span class='abn'>7</span>",ftndRef(7)],
    ["Exhaled CO","<span class='abn'>20 ppm</span>",coRef(20)],
    ["Readiness to quit","8 / 10",readyRef(8)],
    ["Past quit attempts","Quit 2000–2002 with nicotine gum 4 mg and 14 mg patches daily for 10 weeks; relapsed after her husband died",""],
    ["Triggers","After meals, with coffee, reading, gardening, before bed; smokes more when lonely",""]],
  intro:"Hi! I'm Maya Chen, the D2 dental student on Margaret's team. She came in with dry mouth, trouble swallowing and bad breath, and her dentures move when she eats and talks. Her oral tissues are inflamed from the poor fit. She says she's an 8/10 on readiness to quit. Is there anything you noticed as a student pharmacist to assess her needs?",
  reflectOn:"supporting an older adult who is ready to quit but has lost the support she had before",
  qs:[
    { step:0, label:"Scope of practice", text:"Is there anything you noticed as a student pharmacist to assess Margaret's needs?",
      ask:null, must:["cause"], minMet:2,
      points:[
        {id:"cause",label:"Links dry mouth to her anticholinergic inhaler (Spiriva/tiotropium)",re:/anticholin|spiriva|tiotrop|(inhal|copd med|medicat)[^.]{0,60}(dry mouth|xerostom)|(dry mouth|xerostom)[^.]{0,60}(inhal|medicat|side effect)/i,ack:"Yes, her Spiriva could well be behind the dry mouth.",
          hints:["Her dry mouth could have more than one cause. What's on her medication list?","One of her COPD inhalers belongs to a drug class known for drying the mouth. Which one?","Spiriva (tiotropium) is an anticholinergic. How could that relate to her dry mouth?"]},
        {id:"spacer",label:"Suggests a spacer device or switching agents",re:/spacer|chamber|switch|alternative|change (her )?(inhaler|med)/i,ack:"A spacer or a different agent is a good option to raise with her prescriber.",
          hints:["If her inhaler is the cause, what could you change?","Is there a device or a different medicine that could help?","A spacer device or switching agents may help. Would you suggest either?"]},
        {id:"relief",label:"Dry mouth relief (e.g. Biotene rinse)",re:/biotene|saliva|rinse|sugar.?free|xylitol|water|moistur/i,ack:"That would help her comfort right away.",
          hints:["What could make her more comfortable today?","Are there products that help with dry mouth?","A Biotene rinse may help. Would you recommend it?"]},
        {id:"mood",label:"Keeps her depression and mood in mind",re:/depress|mood|lonel|monitor/i,ack:"Good to keep her mood in mind.",
          hints:["Is there anything in her history that quitting could affect?","She has depression and feels lonely. Would you watch for anything?","Monitoring her mood would be wise as she quits."]}
      ],
      pass:"That's a really useful pharmacy view.",
      share:"A complete pharmacy answer: her dry mouth may be due to her anticholinergic COPD inhaler (Spiriva/tiotropium). A spacer device or switching agents may help, and a Biotene rinse can relieve the dryness.",
      perspective:"From the dental side, I'll explain that her ill-fitting dentures can be corrected, which will improve her speech and what she can eat. Her tissues are inflamed but there's enough bone to support a good denture. I'll also tell her that smoking speeds up periodontal destruction and is the reason for her bad breath.",
      options:[
        {t:"I'd recommend a saliva substitute for her dry mouth.",best:false,why:"It helps her comfort, but it only treats the symptom. Her Spiriva (an anticholinergic) is a likely cause, and a spacer or switching agents could fix it at the source."},
        {t:"Her dry mouth may be caused by Spiriva (tiotropium), an anticholinergic for COPD. I'd suggest a spacer device or talk to her prescriber about switching agents, and recommend a Biotene rinse for relief.",best:true,why:"This is the strongest answer. It finds the likely cause in her medication list, offers a fix, and gives her relief now."},
        {t:"Dry mouth is a dental issue, so I'd leave that to you and focus only on her smoking.",best:false,why:"This is a common mistake. Her dry mouth is likely from her COPD inhaler, so pharmacy owns the medication review here."}
      ]
    },
    { step:1, label:"Referrals", text:"If you are the first health professional to encounter Margaret, which referrals or consultations would you make? Name your top 3 and explain why.",
      ask:"Next one. If you were the first health professional to see Margaret, which referrals or consultations would you make? Name your top 3 and tell me why.",
      must:["three","why"], minMet:4,
      points:[
        threeRefs("Margaret"),
        {id:"dental",label:"Includes dental (refit dentures, inflamed tissue)",re:/dent|denture/i,ack:"Agreed, refitting her dentures will help her eat and speak.",
          hints:["Why did she come in today?","Her dentures move when she eats and talks. Who handles that?","Is dentistry in your top 3?"]},
        {id:"pharm",label:"Includes pharmacy (dry mouth from Spiriva, cessation medicines)",re:/pharmac/i,ack:"Yes, pharmacy can tackle her dry mouth and cessation medicines.",
          hints:["Where does your own profession fit?","Who would review her inhaler and start cessation medicines?","Would you include pharmacy?"]},
        {id:"support",label:"Includes a counselor or social worker (loneliness, lost support)",re:/counsel|social work|psycholog|therap|mental|lonel|support/i,ack:"Good, her loneliness is a big trigger.",
          hints:["What makes her smoke more?","She's lonely and doesn't have the support she had last time. Who could help?","Would a counselor or social worker belong in your top 3?"]},
        whyPoint("weight|lonel|ready|dry mouth|denture")
      ],
      pass:"I agree with those choices.",
      share:"Possible referrals are dental, pharmacy, primary care, counselor, dietitian and social worker. A strong top 3 would be dental, pharmacy and a counselor or social worker, each with a reason.",
      perspective:"Dental and pharmacy are clear for me: her dentures need refitting, and pharmacy can handle her dry mouth and cessation medicines. Her loneliness is a big trigger, so a counselor or social worker would help, and primary care or a dietitian could look at her weight loss.",
      options:[
        {t:"Top 3: pulmonology, a dietitian and primary care.",best:false,why:"Her COPD and weight loss matter, but she came in for her mouth and wants to quit, so leaving out dental and pharmacy misses her main needs today."},
        {t:"Top 3: dental, pharmacy and primary care.",best:false,why:"Good picks, but there are no reasons. Explaining why is what shows your clinical thinking, and her loneliness, a key smoking trigger, isn't addressed."},
        {t:"Top 3: dentistry, to refit her dentures and treat the inflamed tissue; pharmacy, to review her dry mouth from Spiriva and start cessation medicines while she's ready; and a counselor or social worker, because loneliness is a key trigger and she's lost the support she had last time.",best:true,why:"This is the strongest answer. Each referral targets a real need in her case, and every choice has a reason."}
      ]
    },
    { step:2, part:"A", label:"Treatment plan · Part A: Fagerström score",
      text:"Open the Tobacco tab. Margaret's Fagerström score is 7. What does that tell you about her nicotine dependence and her quit attempt?",
      ask:"Let's work through her tobacco numbers together, one at a time. Pull up the Tobacco tab. First: her Fagerström score is 7. What does that tell you about her nicotine dependence and her quit attempt?",
      must:["depend"],
      points:[
        {id:"depend",label:"Real nicotine dependence: 7 is in the moderate range (5–7) on the scale",re:/depend|addict|moderate|5 ?(-|–|to) ?7|high|physical/i,ack:"Right, a 7 shows real nicotine dependence.",
          hints:["Check the Fagerström reference values in the Tobacco tab. Which band does 7 fall in?","On the scale, 5 to 7 is moderate dependence. What does that mean for her?","A 7 sits at the top of the moderate band. How dependent is she on nicotine?"]},
        {id:"meds",label:"She'll likely need pharmacotherapy to manage cravings and withdrawal",re:/medic|nrt|patch|lozenge|pharmacotherap|varenicline|crav|withdraw/i,ack:"Good, that tells us medicine should be part of her plan.",
          hints:["What does that level of dependence mean for her quit attempt?","Will willpower alone be enough at this level?","With moderate dependence, she'll likely need medicine to manage cravings."]}
      ],
      pass:"That's how I read it too.",
      share:"A Fagerström score of 7 falls in the moderate dependence range (5 to 7), at the top of that band, and she smokes within 30 minutes of waking. She'll likely need pharmacotherapy to manage cravings and withdrawal.",
      perspective:null,
      options:[
        {t:"A 7 means she's a heavy smoker, so she should cut down slowly first.",best:false,why:"The score measures nicotine dependence, not just how much she smokes, and cutting down alone isn't the plan for someone who's ready to quit."},
        {t:"A 7 means she's dependent on nicotine.",best:false,why:"Right idea, but be specific: on the scale, 7 is moderate dependence (5 to 7), and it tells you she'll likely need medicine to quit."},
        {t:"A 7 is in the moderate dependence range (5 to 7), at the top of that band, and she smokes within 30 minutes of waking. She'll likely need pharmacotherapy to manage cravings and withdrawal.",best:true,why:"This is the strongest answer. It reads the score against the scale and says what it means for her quit attempt."}
      ]
    },
    { step:2, part:"B", label:"Treatment plan · Part B: CO level",
      text:"Margaret's exhaled CO is 20 ppm. What does that tell you?",
      ask:"Next number: her exhaled CO is 20 ppm. What does that tell you?",
      must:["high"],
      points:[
        {id:"high",label:"CO 20 ppm is high (10+ ppm): she is smoking now or very recently",re:/high|elevat|above|over|10\+|abnormal|current|recent|active/i,ack:"Right, 20 ppm is in the high range, so she's actively smoking.",
          hints:["Check the CO reference values in the Tobacco tab. Which range does 20 ppm fall in?","10 ppm and over is high. What does a reading of 20 say about her recent smoking?","20 ppm is far above the non-smoker cut-off of under 6. Is she smoking now?"]},
        {id:"use",label:"Uses the CO reading as a baseline to track progress or motivate her",re:/track|monitor|progress|motivat|show her|feedback|baseline|compare|recheck|re-?test/i,ack:"Nice, it gives us a baseline to recheck after her quit date.",
          hints:["Could the CO reading be useful later on?","How could you use this number after her quit date?","Rechecking CO after she quits can show her progress."]}
      ],
      pass:"Agreed.",
      share:"A CO of 20 ppm is in the high range (10 ppm and over), which confirms she's smoking now. It's a useful baseline: we can recheck it after her quit date to show her progress.",
      perspective:null,
      options:[
        {t:"20 ppm is normal for someone her age.",best:false,why:"CO doesn't depend on age. Anything 10 ppm and over is high and common in people who smoke."},
        {t:"Her CO is high.",best:false,why:"Correct, but say what it means: 20 ppm confirms she's smoking now, and it gives you a baseline to recheck after her quit date."},
        {t:"20 ppm is in the high range (10 ppm and over), which confirms she's smoking now. It's a useful baseline: we can recheck it after her quit date to show her progress.",best:true,why:"This is the strongest answer. It reads the number against the reference values and uses it in her care."}
      ]
    },
    { step:2, part:"C", label:"Treatment plan · Part C: Readiness to quit",
      text:"Margaret rates her readiness to quit as 8 out of 10. What does that tell you?",
      ask:"Last number: she says she's an 8 out of 10 on readiness to quit. What does that tell you?",
      must:["ready"],
      points:[
        {id:"ready",label:"Ready to quit (6–9 range, preparation stage): help her set a quit date",re:/ready|motivat|prepar|quit date|8/i,ack:"Yes, at 8/10 she's ready.",
          hints:["Check the readiness reference values in the Tobacco tab. Where does 8 fall?","6 to 9 on the readiness ruler means ready to change. What would you do next?","At 8/10, would you help her set a quit date?"]},
        {id:"support",label:"Not a 10 because she lost the support she had; build support into the plan",re:/support|lonel|husband|alone|not a 10|why not|friend|isolat/i,ack:"Good catch on why she isn't a 10.",
          hints:["The scenario says why she isn't a 10. What is it?","She mentions what's different from the last time she quit. What's missing?","She doesn't have the support she had before. How would you address that?"]}
      ],
      pass:"Exactly how I'd read it.",
      share:"8/10 is in the ready range (6 to 9), so she's ready to quit and we can help her set a quit date. She isn't a 10 because she doesn't have the support she had last time, so building support is part of the plan.",
      perspective:null,
      options:[
        {t:"8/10 means she's still unsure, so we should wait.",best:false,why:"8 is in the ready range (6 to 9). Waiting could miss her window; she needs a quit date now."},
        {t:"8/10 means she's ready to quit.",best:false,why:"Yes, and the case also tells you why she isn't a 10: she's lost the support she had. Addressing support is part of the plan."},
        {t:"8/10 is in the ready range, so let's help her set a quit date. She isn't a 10 because she's lost the support she had last time, so we should build in support, like a counselor, social worker or the quitline.",best:true,why:"This is the strongest answer. It reads the score and uses the reason behind it."}
      ]
    },
    { step:2, part:"D", label:"Treatment plan · Part D: Your approach",
      text:"Based on these scores, how would you approach Margaret's treatment plan? She's ready to quit, so use the 5 As.",
      ask:"Putting it together: a Fagerström of 7, CO of 20 ppm and 8/10 on readiness. Using the 5 As, how would you approach her treatment plan?",
      must:["quitdate","pharmaco"],
      flag:{re:/5 ?rs|five rs|relevance|roadblock/i,unless:/nrt|patch|lozenge|varenicline|bupropion|inhaler/i,msg:"She's already an 8/10, so the 5 Rs (for people who aren't ready) might slow her down. What would help her quit now?"},
      points:[
        {id:"quitdate",label:"Assist: help her set a quit date (ideally within 2 weeks)",re:/quit date|set a date|quit day|within (the next )?(2|two) weeks|target date/i,ack:"Yes, a quit date gives her something concrete.",
          hints:["She's ready. What's the first concrete step?","The 5 As handout says to set something within 2 weeks. What is it?","Would you help her pick a quit date?"]},
        {id:"pharmaco",label:"Assist: discusses pharmacotherapy options",re:/nrt|patch|lozenge|varenicline|chantix|bupropion|combination|medicat|pharmacotherap/i,ack:"Good, medicine will help with her cravings.",
          hints:["What could help her with cravings and withdrawal?","She used NRT before. What options would you discuss now?","Pharmacotherapy options like the patch, lozenge or varenicline could help."]},
        {id:"gum",label:"Avoids nicotine gum (no teeth, dentures)",re:/gum.{0,50}(denture|teeth|edentul)|(denture|teeth|edentul).{0,50}gum|avoid (nicotine )?gum|no gum|not gum/i,ack:"Nice catch: gum won't work with no teeth and loose dentures.",
          hints:["She used gum last time. Would that still work?","Look at her dental history. Is any NRT form hard to use now?","With no upper teeth and ill-fitting dentures, would you avoid nicotine gum?"]},
        {id:"bup",label:"Avoids bupropion (low appetite, weight loss)",re:/bupropion|zyban|wellbutrin/i,ack:"Good thinking on bupropion and her weight loss.",
          hints:["Is there any cessation medicine that might be a poor fit for her?","She's worried about weight loss. Would any option make that worse?","Bupropion can reduce appetite. Would you avoid it for her?"]},
        {id:"trigger",label:"Assist: trigger plan (5 Ds)",re:/5 ?d|five d|trigger|delay|deep breath|drink water|distract/i,ack:"A trigger plan will help with her meals, coffee and gardening.",
          hints:["What situations make her want to smoke?","She smokes after meals, with coffee, reading and gardening. How would you plan for those?","The 5 Ds trigger plan is in the IPE Resources tab. Would you use it?"]},
        {id:"advise",label:"Advise: link quitting to halitosis, taste, dry mouth and lung cancer",re:/halitosis|bad breath|taste|lung (cancer|function)|cancer|breath/i,ack:"Linking it to her bad breath and lungs makes the advice personal.",
          hints:["How would you make your advice personal to her?","She may not know what's causing her bad breath. What would you tell her?","Quitting will improve her bad breath, taste, dry mouth and lung function, and lower her lung cancer risk."]},
        {id:"arrange",label:"Arrange: specialist clinic or 1-800-QUIT-NOW",re:/follow|quitline|quit ?now|800|refer|clinic|specialist/i,ack:"Good, follow-up support is lined up.",
          hints:["What would you arrange after today?","Who could support her between visits?","A specialist clinic or the quitline (1-800-QUIT-NOW) would cover Arrange."]}
      ],
      pass:"That's a strong plan for someone who's ready.",
      share:"Here's a complete plan. Ask: we know her smoking habit. Advise: quitting will improve her bad breath, taste and dry mouth, her lung function, and lower her lung cancer risk. Assess: she's motivated (8/10); smoking within 30 minutes of waking shows physical dependence and CO 20 ppm is elevated. Assist: build a 5 Ds trigger plan, help her pick a quit date and discuss pharmacotherapy, avoiding nicotine gum (no teeth) and bupropion (low appetite). Arrange: a specialist clinic or 1-800-QUIT-NOW.",
      perspective:"I'll get her dentures refit so she can eat and speak comfortably, and I'll remind her that quitting will help her bad breath and taste.",
      options:[
        {t:"Since she's not completely sure, I'd use the 5 Rs and hold off on medicines.",best:false,why:"This is a common mistake. She's 8/10 and motivated, so she's ready. The 5 Rs fit someone ambivalent like Lucy. Margaret needs a quit date and pharmacotherapy now."},
        {t:"She's motivated (8/10), so let's help her set a quit date within 2 weeks. Smoking within 30 minutes of waking, a Fagerström of 7 and a CO of 20 ppm show real dependence. I'd build a 5 Ds trigger plan for meals, coffee, reading and gardening, and discuss pharmacotherapy, avoiding nicotine gum since she has no teeth and avoiding bupropion given her low appetite. Then I'd refer her to a cessation clinic or 1-800-QUIT-NOW.",best:true,why:"This is the strongest answer. It follows all 5 As, uses her numbers, and picks options that fit her teeth and appetite."},
        {t:"She quit before with the gum and the patch, so I'd restart the same: 4 mg gum and 14 mg patches.",best:false,why:"Building on what worked is smart, but gum isn't an option now that she has no teeth and loose dentures. There's also no quit date, trigger plan or follow-up."}
      ]
    },
    { step:3, label:"Joint plan", text:"Write a brief joint summary plan for Margaret's file.",
      ask:"Let's wrap up. Can you write a brief joint summary plan for Margaret's file, covering what pharmacy and dentistry will each do?",
      must:["pharm","dent","tob"],
      points:[
        {id:"pharm",label:"Pharmacy's part (dry mouth review, cessation medicines)",re:/nrt|patch|lozenge|varenicline|spiriva|tiotrop|anticholin|dry mouth|spacer|biotene|medicat|pharmac/i,ack:"",hints:["What will pharmacy do?","Include the dry mouth review and cessation medicines.","Add pharmacy's part."]},
        {id:"dent",label:"Dentistry's part (refit dentures, halitosis)",re:/denture|refit|reline|dent|halitosis|perio/i,ack:"",hints:["What will dentistry do?","Don't forget my part.","Add refitting her dentures."]},
        {id:"support",label:"Support for loneliness or mood",re:/lonel|counsel|social work|support|depress|mood/i,ack:"",hints:["What about her loneliness?","Add support for her mood or loneliness.","Include a counselor or social worker."]},
        {id:"tob",label:"Quit plan with a quit date",re:/quit date|quit|cessation|5 ?d|trigger/i,ack:"",hints:["What's the plan for her smoking?","Summarize the quit plan.","Add the quit date and trigger plan."]},
        {id:"follow",label:"Follow-up arranged",re:/follow|arrange|quitline|800|clinic|check.?in|next visit/i,ack:"",hints:["When will we see her again?","Add a follow-up.","Include the quitline or a clinic referral."]}
      ],
      pass:"Perfect, that's a clear plan for her chart.",
      share:"Dentistry will refit her dentures and explain how smoking causes her bad breath. Pharmacy will review Spiriva as a likely cause of her dry mouth, help her set a quit date, build a 5 Ds trigger plan and start pharmacotherapy without gum or bupropion. We'll refer her to a counselor or social worker for support and arrange a cessation clinic or the quitline.",
      perspective:null,
      options:[
        {t:"Pharmacy handles smoking, dentistry handles dentures.",best:false,why:"Right roles, but too thin for the chart: no specific actions, no follow-up and nothing about her loneliness."},
        {t:"Plan: restart the gum and patch and follow up.",best:false,why:"This only covers pharmacy's part, and gum won't work with her teeth. A joint plan needs both professions and how you'll coordinate."},
        {t:"Dentistry will refit her dentures, treat the inflamed tissue and explain how smoking causes her bad breath. Pharmacy will review Spiriva as a likely cause of her dry mouth (spacer, switching agents, Biotene), help her set a quit date, build a 5 Ds trigger plan and start pharmacotherapy without gum or bupropion. We'll refer her to a counselor or social worker for support and arrange a cessation clinic or 1-800-QUIT-NOW.",best:true,why:"This is the strongest answer. Both professions have clear actions, her loneliness is addressed, and follow-up is arranged."}
      ]
    }
  ]
}
};

