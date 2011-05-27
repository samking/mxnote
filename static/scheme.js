/*Global scheme data */
var mHKeys = new Array('escitalopram', 'carbamazapine', 'Norebox', 'sertraline', 'mianserin', 'Norval', 'Nardil', 'Amnesia', 'Surmontil', 'Tecipul', 'saffron', 'Norpramin', 'hypericum', 'Malaise', 'Trileptal', 'Neurontin', 'amitriptyline', 'Lomont', 'Gerdaxyl', 'Demolox', 'Eldepryl', 'apnea', 'fluoxetine', 'involuntary', 'celecoxib', 'dosulepin', 'lofepramine', 'medifoxamine', 'oxcarbazapine', 'setiptiline', 'tobacco', 'Parnate', 'Lyrica', 'moclobemide', 'Survector', 'Lexapro', 'gabapentin', 'Tegretol', 'ORG-50', 'Ritalin', 'mental', 'CGS-7525A', 'Aurorix', 'Menopausal', 'depressive', 'acid', 'Zispin', 'incontinence', 'Eskalith', 'Davedax', 'Vestra', 'Cledial', 'Insomnia', 'imipramine', 'Dothiepin', 'Solian', 'alprazolam', 'doxepin', 'milnacipran', 'dementia', 'isocarboxazid', 'Zelapar', 'Geodon', 'aripiprazole', 'Pamelor', 'giddiness', 'attention', 'Solvex', 'Wort', 'Lamictal', 'venlafaxine', 'Concerta', 'Directim', 'Haldol', 'Oppositional', 'phenelzine', 'Celexa', 'Abnormal', 'dependence', 'Pirazidol', 'reboxetine', 'Anafranil', 'Stablon', 'topiramate', 'Depressive', 'placebo', 'duloxetine', 'Provector','Coaxil', 'valproic', 'nortriptyline', 'Sinequan', 'Avanza', 'pirlindole', 'Prozac', 'Seroquel', 'aptazapine', 'dexamethylphenidate', 'trazodone', 'trimipramine', 'selegiline', 'fluvoxamine', 'clomipramine', "Alzheimer's", 'pindolol','pregabalin', 'Feprapax', 'Neolior', 'Tobacco', 's-adenosyl-L-methionine', 'risperidone', 'Ixel','Zyban', 'desipramine', 'Xanax', 'Dizziness', 'Adapin', 'lamotrigine', 'Bolvidon', 'Vivactil', 'Remeron', 'buproprion', 'Edronax', 'Paxil', 'Pertofrane', 'quetiapine', 'behavior', 'Desyrel', 'tianeptine', 'amineptine', 'amisulpride', 'mirtazapine','paroxetine', 'haloperidol', 'Cymbalta', 'amoxapine', 'hyperactivity', 'Maneon', 'Serzone', 'Prolift', 'Depakote', 'Abilify', 'Effexor','Sulpitac', 'yoga', 'Topamax', 'Viaspera', 'Gamanil', 'Defanyl', 'Attention', 'Emsam', 'defiant', 'Luvox', 'citalopram', 'Prothiaden', 'Disruptive', 'ziprasidone', 'lithium', 'Manerix', 'Elavil', 'Tatinol', 'Focalin', 'methylphenidate', 'Asendin', 'SAMe', 'Risperdal', 'Asendis', 'Zoloft', 'fatigue', 'esmirtazapine', 'Soltus', 'tranylcypromine', 'Moxadil', 'Zyprexa', 'protriptyline', 'Wellbutrin', 'Tofranil', 'stress', 'Endep', 'nefazodone', 'Dysthymia', 'Tolvon', 'desvenlafaxine', 'olanzapine', 'Marplan', 'Pristiq');

var t2DKeys = new Array('Glucose', 'SULFONYLUREA-THIAZOLIDINEDIONE', 'PIOGLITAZONE', 'INCRETIN', 'hypercholesterolemia', 'THIAZOLIDINEDIONES', 'foot', 'SUPPLEMENT', 'AGENTS', 'NAT', 'ACARBOSE', 'GLP-1', 'thyroid', 'COMB', 'DIPEPTIDYL', 'BIGUANIDE-NUTRITIONAL', 'POTASSIUM', 'GLIMEPIRIDE', 'VALSARTAN', 'mellitus', 'Malaise', 'GLIPIZIDE-METFORMIN', 'AMINO', 'ASPART', 'MESYLATE', 'SITAGLIPTIN', 'apnea', 'GLIPIZIDE', 'Arthralgia', 'INTEST', 'INSULIN', 'ATORVASTATIN', 'MEGLITINIDE', 'AMLODIPINE', 'Epigastric', 'ANTIHYPERLIPIDEMICS', 'tobacco', 'TOLAZAMIDE', 'TELMISARTAN', 'TOLBUTAMIDE', 'AMLODIPINE-ATORVASTATIN', 'obesity', 'HYDROCHLOROTHIAZIDE', 'GLARGINE', 'SULFONYLUREAS', 'LISPRO', 'SENSITIZING', 'REDUCT', 'HCL-METFORMIN', 'metformin', 'ANTIDIABETIC', 'ABSORP', 'Hypertensive', 'METFORMIN', 'MIMETIC', 'ANALOGUES', 'INHIBITORS', 'LOSARTAN', 'SAXAGLIPTIN', 'Hypothyroidism', 'HMG', 'ANTAG', 'CHLORPROPAMIDE', 'LOVASTATIN', 'NIACIN-LOVASTATIN', 'CARDIOVASCULAR', 'Hyperlipidemia', 'Edema','SIMVASTATINALISKIREN', 'EXENATIDE', 'ANGIOTENSIN', 'ROSIGLITAZONE-GLIMEPIRIDE', 'INHIBITOR-BIGUANIDE', 'COA', 'THIAZOLIDINEDIONE-BIGUANIDE', 'MEDOXOMIL', 'OLMESARTAN', 'CANDESARTAN', 'THIAZIDES', 'EZETIMIBE-SIMVASTATIN', 'DIET', 'ALPHA-GLUCOSIDASE', 'MALEATE', 'REDUCTASE', 'D-PHENYLALANINE', 'EPROSARTAN', 'REPAGLINIDE', 'Diabetes', 'INHIB-HMG', 'BESYLATE', 'CHOLEST', 'REPAGLINIDE-METFORMIN', 'INHIBIT', 'MIGLITOL', 'SODIUM', 'PRAVASTATIN', 'ureter', 'PRAMLINTIDE', 'SITAGLIPTIN-METFORMIN', 'CALCIUM', '(DPP-4)', 'GLYBURIDE', 'kidney', 'FLUVASTATIN', 'PEPTIDASE', 'HCL-GLIMEPIRIDE', 'ACETATE', 'RENIN', 'GLULISINE', 'CILEXETIL', 'MEGLITINIDE-BIGUANIDE', 'ROSIGLITAZONE-METFORMIN', 'MICRONIZED', 'SULFONYLUREA-BIGUANIDE', 'GLYBURIDE-METFORMIN', 'NATEGLINIDE', 'HCTZ', 'PHOSPHATE', 'fatigue', 'IRBESARTAN', 'AMYLIN', 'ISOPHANE', 'NIACIN-SIMVASTATIN', 'ROSIGLITAZONE', 'ROSUVASTATIN', 'Albumin SerPl-mCnc','Albumin/Creat Ur-mRto', 'Cholest SerPl-mCnc', 'Glucose Bld-mCnc', 'Glucose p fast SerPl-mCnc', 'Glucose SerPl-mCnc', 'HDLc SerPl-mCnc','Hgb A1c MFr Bld', 'Hgb Bld Calc-mCnc', 'Hgb Bld-mCnc', 'LDLc SerPl Calc-mCnc', 'Prot SerPl-mCnc', 'Prot Ur Strip-mCnc', 'Trigl SerPl-mCnc');

var cardioKeys = new Array('CILOSTAZOL', 'PORCINE', 'ANAGRELIDE', 'Coronary', 'Conjunctivitis', 'Vascular', 'DEXT', 'CITRATE', 'cardiovascular', 'Dilated', 'arteriosclerosis', 'SODIUM', 'THROMBIN', 'Preinfarction', 'DIPYRIDAMOLE', 'Heart', 'DALTEPARIN', 'tobacco', 'FONDAPARINUX', 'D5W', 'DEX', 'Congestive', 'ARGATROBAN', 'PHOS', 'ENOXAPARIN', 'Hypertensive', 'NACL', 'cardiomyopathy', 'QUINAZOLINE', 'THIENOPYRIDINE', 'rheumatic', 'ANTICOAG', 'pulmonary', 'ECG', 'WARFARIN', 'PHOSPHODIESTERASE', 'fibrillation', 'HEPARINOID', 'HIRUDIN', 'Cardiomyopathy', 'ischemic', 'TICLOPIDINE', 'Myalgia', 'LEPIRUDIN', 'CLOPIDOGREL', 'IIB/IIIA', 'COUMARIN', 'ABCIXIMAB', 'heart', 'Atrial', 'myositis', 'Chest', 'CIT', 'Hematuria', 'PRASUGREL', 'TINZAPARIN', 'ANTICOAGULANT', 'ANTICOAGULANTS', 'infarction', 'Cardiac', 'GLYCOPROTEIN', 'myocardial',  'ASPIRIN-DIPYRIDAMOLE', 'Hyperlipidemia', 'Precordial', 'HEPARIN', 'BISULFATE', 'TIROFIBAN', 'EPTIFIBATIDE', 'Cholest SerPl-mCnc', 'HDLc SerPl-mCnc', 'LDLc SerPl Calc-mCnc', 'Trigl SerPl-mCnc', 'CRP SerPl HS-mCnc');

function saveData() {
 /*TODO Sam */
}


function loadData() {
  /*TODO Sam */
}

function isInDiseaseScheme(name, scheme) {
    /* Schemes are: 'Cardio', 'T2d', 'Mental' */
    /* try a match */
    

    newName = name.toLowerCase();
    
    if (scheme == 'Cardio')
    {
        for (var i = 0; i < cardioKeys.length; i++)
        {
            if (name.match(cardioKeys[i]) || newName.match((cardioKeys[i].toLowerCase())))
                return true;
        } 
    }
    if (scheme == 'T2d')
    {
        for (var i = 0; i < t2DKeys.length; i++)
        {
            if (name.match(t2DKeys[i]) || newName.match((t2DKeys[i].toLowerCase())))
                return true;
        } 
    }
    
    if (scheme == 'Mental')
    {
        for (var i = 0; i < mHKeys.length; i++)
        {
            if (name.match(mHKeys[i]) || newName.match((mHKeys[i].toLowerCase())))
                return true;
        } 
    }
    return false;
}

