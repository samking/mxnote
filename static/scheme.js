/*Global scheme data */

var mHKeys = new Array('escitalopram', 'carbamazapine', 'Norebox', 'sertraline', 'mianserin', 'Norval', 'Nardil', 'Amnesia', 'Surmontil', 'Tecipul', 'saffron', 'Norpramin', 'hypericum', 'Malaise', 'Trileptal', 'Neurontin', 'amitriptyline', 'Lomont', 'Gerdaxyl', 'Demolox', 'Eldepryl', 'fluoxetine', 'involuntary', 'dosulepin', 'lofepramine', 'medifoxamine', 'oxcarbazapine', 'setiptiline', 'tobacco', 'Parnate', 'Lyrica', 'moclobemide', 'Survector', 'Lexapro', 'gabapentin', 'Tegretol', 'ORG-50', 'Ritalin', 'mental', 'CGS-7525A', 'Aurorix', 'Menopausal', 'depressive', 'acid', 'Zispin', 'incontinence', 'Eskalith', 'Davedax', 'Vestra', 'Cledial', 'Insomnia', 'imipramine', 'Dothiepin', 'Solian', 'alprazolam', 'doxepin', 'milnacipran', 'dementia', 'isocarboxazid', 'Zelapar', 'Geodon', 'aripiprazole', 'Pamelor', 'giddiness', 'attention', 'Solvex', 'Wort', 'Lamictal', 'venlafaxine', 'Concerta', 'Directim', 'Haldol', 'Oppositional', 'phenelzine', 'xa', 'dependence', 'Pirazidol', 'reboxetine', 'Anafranil', 'Stablon', 'topiramate', 'Depressive', 'placebo', 'duloxetine', 'Provector','Coaxil', 'valproic', 'nortriptyline', 'Sinequan', 'Avanza', 'pirlindole', 'Prozac', 'Seroquel', 'aptazapine', 'dexamethylphenidate', 'trazodone', 'trimipramine', 'selegiline', 'fluvoxamine', 'clomipramine', "Alzheimer's", 'pindolol','pregabalin', 'Feprapax', 'Neolior', 'Tobacco', 's-adenosyl-L-methionine', 'risperidone', 'Ixel','Zyban', 'desipramine', 'Xanax', 'Dizziness', 'Adapin', 'lamotrigine', 'Bolvidon', 'Vivactil', 'Remeron', 'buproprion', 'Edronax', 'Paxil', 'Pertofrane', 'quetiapine', 'behavior', 'Desyrel', 'tianeptine', 'amineptine', 'amisulpride', 'mirtazapine','paroxetine', 'haloperidol', 'Cymbalta', 'amoxapine', 'hyperactivity', 'Maneon', 'Serzone', 'Prolift', 'Depakote', 'Abilify', 'Effexor','Sulpitac', 'yoga', 'Topamax', 'Viaspera', 'Gamanil', 'Defanyl', 'Attention', 'Emsam', 'defiant', 'Luvox', 'citalopram', 'Prothiaden', 'Disruptive', 'ziprasidone', 'lithium', 'Manerix', 'Elavil', 'Tatinol', 'Focalin', 'methylphenidate', 'Asendin', 'SAMe', 'Risperdal', 'Asendis', 'Zoloft', 'fatigue', 'esmirtazapine', 'Soltus', 'tranylcypromine', 'Moxadil', 'Zyprexa', 'protriptyline', 'Wellbutrin', 'Tofranil', 'stress', 'Endep', 'nefazodone', 'Dysthymia', 'Tolvon', 'desvenlafaxine', 'olanzapine', 'Marplan', 'Pristiq');

var t2DKeys = new Array('Glucose', 'SULFONYLUREA-THIAZOLIDINEDIONE', 'PIOGLITAZONE', 'INCRETIN', 'hypercholesterolemia', 'THIAZOLIDINEDIONES', 
'foot', 'SUPPLEMENT', 'AGENTS', 'NAT', 'ACARBOSE', 'GLP-1', 'thyroid', 'COMB', 'DIPEPTIDYL', 'BIGUANIDE-NUTRITIONAL', 'GLIMEPIRIDE', 
'VALSARTAN', 'mellitus', 'Malaise', 'GLIPIZIDE-METFORMIN', 'AMINO', 'ASPART', 'MESYLATE', 'SITAGLIPTIN', 'apnea', 'GLIPIZIDE', 'Arthralgia', 
'INTEST', 'INSULIN', 'ATORVASTATIN', 'MEGLITINIDE', 'AMLODIPINE', 'Epigastric', 'ANTIHYPERLIPIDEMICS', 
'tobacco', 'TOLAZAMIDE', 'TELMISARTAN', 'TOLBUTAMIDE', 'AMLODIPINE-ATORVASTATIN', 'obesity', 'HYDROCHLOROTHIAZIDE', 'GLARGINE', 
'SULFONYLUREAS', 'LISPRO', 'SENSITIZING', 'REDUCT', 'HCL-METFORMIN', 'metformin', 'ANTIDIABETIC', 'ABSORP', 
'Hypertensive', 'METFORMIN', 'MIMETIC', 'ANALOGUES', 'INHIBITORS', 'LOSARTAN', 'SAXAGLIPTIN', 'Hypothyroidism', 
'HMG', 'ANTAG', 'CHLORPROPAMIDE', 'LOVASTATIN', 'NIACIN-LOVASTATIN', 'CARDIOVASCULAR', 'Hyperlipidemia', 
'Edema','SIMVASTATINALISKIREN', 'EXENATIDE', 'ANGIOTENSIN', 'ROSIGLITAZONE-GLIMEPIRIDE', 'INHIBITOR-BIGUANIDE', 'COA', 
'THIAZOLIDINEDIONE-BIGUANIDE', 'MEDOXOMIL', 'OLMESARTAN', 'CANDESARTAN', 'THIAZIDES', 'EZETIMIBE-SIMVASTATIN', 'DIET', 'ALPHA-GLUCOSIDASE', 'MALEATE', 'REDUCTASE', 'D-PHENYLALANINE', 'EPROSARTAN', 'REPAGLINIDE', 'Diabetes', 'INHIB-HMG', 'BESYLATE', 'CHOLEST', 'REPAGLINIDE-METFORMIN', 'INHIBIT', 'MIGLITOL', 'PRAVASTATIN', 'ureter', 'PRAMLINTIDE', 'SITAGLIPTIN-METFORMIN', '(DPP-4)', 'GLYBURIDE', 'kidney', 'FLUVASTATIN', 'PEPTIDASE', 'HCL-GLIMEPIRIDE', 'ACETATE', 'RENIN', 'GLULISINE', 'CILEXETIL', 'MEGLITINIDE-BIGUANIDE', 'ROSIGLITAZONE-METFORMIN', 'MICRONIZED', 'SULFONYLUREA-BIGUANIDE', 'GLYBURIDE-METFORMIN', 'NATEGLINIDE', 'HCTZ', 'PHOSPHATE', 'fatigue', 'IRBESARTAN', 'AMYLIN', 'ISOPHANE', 'NIACIN-SIMVASTATIN', 'ROSIGLITAZONE', 'ROSUVASTATIN','Albumin/Creat Ur-mRto', 'Cholest SerPl-mCnc', 'Glucose Bld-mCnc', 'Glucose p fast SerPl-mCnc', 'Glucose SerPl-mCnc', 'HDLc SerPl-mCnc','A1c', 'LDLc SerPl Calc-mCnc', 'Prot Ur Strip-mCnc', 'Trigl SerPl-mCnc', 'Welchol', 'Victoza', 'Velosulin', 'Tradjenta', 'Tol-Tab', 'Tolinase', 'SymlinPen', 'Symlin', 'Starlix', 'sitagliptin', 'saxagliptin', 'rosiglitazone', 'Riomet', 'Rezulin', 'repaglinide', 'ReliOn/Novolin', 'Relion Novolin ', 'ReliOn', 'Precose', 'Prandin', 'PrandiMet', 'pioglitazone', 'Orinase', 'Onglyza', 'Novolog', 'Novolin ', 'Novolin', 'Micronase', 'Metaglip', 'lispro', 'Levemir', 'Lente', 'Lantus', 'Lantus', 'Lantus', 'Kombiglyze', 'Januvia', 'Janumet', 'Insulin', 'Iletin Lente', 'Humulin', 'Humalog', 'Glyset', 'Glynase', 'Glycron', 'Glumetza', 'Glucovance', 'Glucotrol', 'Glucophage', 'GlipiZIDE', 'Fortamet', 'Exubera', 'Duetact', 'Diabinese', 'DiaBeta', 'Cycloset', 'CRM', 'Cr-GTF', 'Byetta', 'Avandia', 'Avandaryl', 'Avandamet', 'Apidra', 'Amaryl', 'Actos', 'ActoPlus', 'troglitazone', 'tolbutamide', 'tolazamide', 'thiazolidinediones', 'sulfonylureas', 'sitagliptin', 'saxagliptin', 'rosiglitazone', 'repaglinide', 'pramlintide', 'pioglitazone', 'non-sulfonylureas', 'nateglinide', 'miglitol', 'metformin', 'meglitinides', 'liraglutide', 'insulin', 'glyburide', 'glipizide', 'glimepiride', 'exenatide', 'colesevelam', 'chlorpropamide', 'bromocriptine', 'amylin analogs', 'acarbose', 'Albumin SerPl-mCnc','Albumin/Creat Ur-mRto', 'Cholest SerPl-mCnc', 'Glucose Bld-mCnc', 'Glucose p fast SerPl-mCnc', 'Glucose SerPl-mCnc', 'HDLc SerPl-mCnc','A1c', 'LDLc SerPl Calc-mCnc', 'Prot SerPl-mCnc', 'Prot Ur Strip-mCnc', 'Trigl SerPl-mCnc');

var cardioKeys = new Array('CILOSTAZOL', 'PORCINE', 'ANAGRELIDE', 'Coronary', 'Conjunctivitis', 'Vascular', 'DEXT', 'CITRATE', 'cardiovascular', 'Dilated', 'arteriosclerosis', 'THROMBIN', 'Preinfarction', 'DIPYRIDAMOLE', 'Heart', 'DALTEPARIN', 'tobacco', 'FONDAPARINUX', 'D5W', 'DEX', 'Congestive', 'ARGATROBAN', 'PHOS', 'ENOXAPARIN', 'Hypertensive', 'NACL', 'cardiomyopathy', 'QUINAZOLINE', 'THIENOPYRIDINE', 'rheumatic', 'ANTICOAG', 'pulmonary', 'ECG', 'WARFARIN', 'PHOSPHODIESTERASE', 'fibrillation', 'HEPARINOID', 'HIRUDIN', 'Cardiomyopathy', 'ischemic', 'TICLOPIDINE', 'Myalgia', 'LEPIRUDIN', 'CLOPIDOGREL', 'IIB/IIIA', 'COUMARIN', 'ABCIXIMAB', 'heart', 'Atrial', 'myositis', 'Chest', 'Hematuria', 'PRASUGREL', 'TINZAPARIN', 'ANTICOAGULANT', 'ANTICOAGULANTS', 'infarction', 'Cardiac', 'GLYCOPROTEIN', 'myocardial',  'ASPIRIN-DIPYRIDAMOLE', 'Hyperlipidemia', 'Precordial', 'HEPARIN', 'BISULFATE', 'TIROFIBAN', 'EPTIFIBATIDE', 'Cholest SerPl-mCnc', 'HDLc SerPl-mCnc', 'LDLc SerPl Calc-mCnc', 'Trigl SerPl-mCnc', 'CRP SerPl HS-mCnc', 'lipitor', 'atorvastatin', 'crestor', 'rosuvastatin', 'micardis', 'telmisartan', 'Letairis ', 'ambrisentan', 'Tracleer ', 'bosentan', 'Tyvaso ', 'treprostinil', 'Revatio ', 'sildenafil', 'Flolan ', 'epoprostenol', 'Remodulin', 'treprostinil', 'Ventavis ', 'iloprost', 'lisinopril', 'metoprolol', 'carvedilol', 'clopidogrel', 'prasugrel', 'aspirin', 'nitroglycerin', 'furosemide', 'enalapril', 'fenofibrate', 'niacin', 'hydrochlorothiazide', 'ezetimide', 'amiodarone', 'fosinopril', 'clonidine', 'digoxin', 'isosorbide mononitrate', 'isosorbide dinitrate', 'Cholest SerPl-mCnc', 'HDLc SerPl-mCnc', 'LDLc SerPl Calc-mCnc', 'Trigl SerPl-mCnc', 'CRP SerPl HS-mCnc');

function compare(name, arr) {
  name = name.toLowerCase();
  var tokenized = name.split(' ');

  for (var j = 0; j < arr.length; j++) {
    if (name == arr[j].toLowerCase()) return true;
    for (var i = 0; i < tokenized.length; i++) {
      if (tokenized[i] == arr[j].toLowerCase()) return true;
    }
  }
  return false;
}

function isInDiseaseScheme(name, scheme) {
    /* Schemes are: 'Cardio', 'T2d', 'Mental' */

    if (scheme == 'Cardio') {
      return compare(name, cardioKeys);
    } else if (scheme == 'T2d') {
      return compare(name, t2DKeys);
    } else if (scheme == 'Mental') {
      return compare(name, mHKeys);
    }
    return false;
}

