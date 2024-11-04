const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Simulated Database
const medicines = [
  // Category: Common Cold (Rhinovirus)
  { id: 1, medicineName: "Acetaminophen", commercialName: "Tylenol", category: "Common Cold (Rhinovirus)", description: "Relief of fever and mild to moderate pain.", type: "tablet", dosage: "500mg", frequency: "Every 4 to 6 hours as needed" },
  { id: 2, medicineName: "Diphenhydramine", commercialName: "Benadryl", category: "Common Cold (Rhinovirus)", description: "Antihistamine for relief of allergy symptoms.", type: "tablet", dosage: "25mg", frequency: "Every 4 to 6 hours as needed" },
  { id: 3, medicineName: "Phenylephrine", commercialName: "Sudafed PE", category: "Common Cold (Rhinovirus)", description: "Decongestant for nasal congestion.", type: "tablet", dosage: "10mg", frequency: "Every 4 hours as needed" },
  { id: 4, medicineName: "Guaifenesin", commercialName: "Mucinex", category: "Common Cold (Rhinovirus)", description: "Expectorant to help loosen mucus.", type: "tablet", dosage: "400mg", frequency: "Every 4 hours as needed" },
  { id: 5, medicineName: "Dextromethorphan", commercialName: "Robitussin DM", category: "Common Cold (Rhinovirus)", description: "Cough suppressant for relief of dry cough.", type: "liquid", dosage: "10mg/5ml", frequency: "Every 4 hours as needed" },
  { id: 6, medicineName: "Cetirizine", commercialName: "Zyrtec", category: "Common Cold (Rhinovirus)", description: "Antihistamine for allergic reactions.", type: "tablet", dosage: "10mg", frequency: "Once daily" },
  { id: 7, medicineName: "Ibuprofen", commercialName: "Advil", category: "Common Cold (Rhinovirus)", description: "NSAID for pain relief and inflammation.", type: "tablet", dosage: "200mg", frequency: "Every 6 to 8 hours as needed" },
  { id: 8, medicineName: "Aspirin", commercialName: "Bayer Aspirin", category: "Common Cold (Rhinovirus)", description: "Pain reliever and anti-inflammatory.", type: "tablet", dosage: "325mg", frequency: "Every 4 to 6 hours as needed" },
  { id: 9, medicineName: "Fluticasone", commercialName: "Flonase", category: "Common Cold (Rhinovirus)", description: "Nasal spray for inflammation and congestion.", type: "spray", dosage: "50mcg", frequency: "Two sprays in each nostril once daily" },
  { id: 10, medicineName: "Mucinex DM", commercialName: "Mucinex DM", category: "Common Cold (Rhinovirus)", description: "Relief of chest congestion and cough.", type: "tablet", dosage: "600mg", frequency: "Every 12 hours" },
  
  // Category: Pain Relief
  { id: 11, medicineName: "Naproxen", commercialName: "Aleve", category: "Pain Relief", description: "NSAID for pain relief and inflammation.", type: "tablet", dosage: "220mg", frequency: "Every 8 to 12 hours as needed" },
  { id: 12, medicineName: "Morphine", commercialName: "MS Contin", category: "Pain Relief", description: "Opioid analgesic for severe pain.", type: "tablet", dosage: "15mg", frequency: "Every 4 hours as needed" },
  { id: 13, medicineName: "Oxycodone", commercialName: "OxyContin", category: "Pain Relief", description: "Opioid analgesic for severe pain.", type: "tablet", dosage: "10mg", frequency: "Every 12 hours" },
  { id: 14, medicineName: "Acetylsalicylic Acid", commercialName: "Bufferin", category: "Pain Relief", description: "Pain relief and anti-inflammatory.", type: "tablet", dosage: "325mg", frequency: "Every 4 to 6 hours as needed" },
  { id: 15, medicineName: "Ketorolac", commercialName: "Toradol", category: "Pain Relief", description: "Short-term management of moderate to severe pain.", type: "tablet", dosage: "10mg", frequency: "Every 4 to 6 hours as needed" },
  { id: 16, medicineName: "Tramadol", commercialName: "Ultram", category: "Pain Relief", description: "Moderate pain relief.", type: "tablet", dosage: "50mg", frequency: "Every 4 to 6 hours as needed" },
  { id: 17, medicineName: "Gabapentin", commercialName: "Neurontin", category: "Pain Relief", description: "Neuropathic pain management.", type: "capsule", dosage: "300mg", frequency: "Three times daily" },
  { id: 18, medicineName: "Pregabalin", commercialName: "Lyrica", category: "Pain Relief", description: "Neuropathic pain management.", type: "capsule", dosage: "75mg", frequency: "Twice daily" },
  { id: 19, medicineName: "Fentanyl", commercialName: "Duragesic", category: "Pain Relief", description: "Severe pain relief.", type: "patch", dosage: "25mcg/hour", frequency: "Every 72 hours" },
  { id: 20, medicineName: "Amitriptyline", commercialName: "Elavil", category: "Pain Relief", description: "Used for chronic pain relief and depression.", type: "tablet", dosage: "25mg", frequency: "Once daily" },

  // Category: Hypertension
  { id: 21, medicineName: "Amlodipine", commercialName: "Norvasc", category: "Hypertension", description: "Calcium channel blocker for hypertension.", type: "tablet", dosage: "5mg", frequency: "Once daily" },
  { id: 22, medicineName: "Lisinopril", commercialName: "Prinivil", category: "Hypertension", description: "ACE inhibitor for hypertension.", type: "tablet", dosage: "10mg", frequency: "Once daily" },
  { id: 23, medicineName: "Losartan", commercialName: "Cozaar", category: "Hypertension", description: "Angiotensin receptor blocker for hypertension.", type: "tablet", dosage: "50mg", frequency: "Once daily" },
  { id: 24, medicineName: "Hydrochlorothiazide", commercialName: "Microzide", category: "Hypertension", description: "Thiazide diuretic for hypertension.", type: "tablet", dosage: "12.5mg", frequency: "Once daily" },
  { id: 25, medicineName: "Metoprolol", commercialName: "Lopressor", category: "Hypertension", description: "Beta-blocker for hypertension.", type: "tablet", dosage: "50mg", frequency: "Once daily" },
  { id: 26, medicineName: "Diltiazem", commercialName: "Cardizem", category: "Hypertension", description: "Calcium channel blocker for hypertension.", type: "tablet", dosage: "120mg", frequency: "Once daily" },
  { id: 27, medicineName: "Verapamil", commercialName: "Calan", category: "Hypertension", description: "Calcium channel blocker for hypertension.", type: "tablet", dosage: "240mg", frequency: "Once daily" },
  { id: 28, medicineName: "Clonidine", commercialName: "Catapres", category: "Hypertension", description: "Alpha-agonist for hypertension.", type: "tablet", dosage: "0.1mg", frequency: "Twice daily" },
  { id: 29, medicineName: "Bisoprolol", commercialName: "Zebeta", category: "Hypertension", description: "Beta-blocker for hypertension.", type: "tablet", dosage: "5mg", frequency: "Once daily" },
  { id: 30, medicineName: "Ramipril", commercialName: "Altace", category: "Hypertension", description: "ACE inhibitor for hypertension.", type: "tablet", dosage: "2.5mg", frequency: "Once daily" },

  // Category: Diabetes
  { id: 31, medicineName: "Metformin", commercialName: "Glucophage", category: "Diabetes", description: "Management of type 2 diabetes.", type: "tablet", dosage: "500mg", frequency: "Twice daily" },
  { id: 32, medicineName: "Glyburide", commercialName: "Diabeta", category: "Diabetes", description: "Sulfonylurea for type 2 diabetes.", type: "tablet", dosage: "2.5mg", frequency: "Once daily" },
  { id: 33, medicineName: "Insulin Glargine", commercialName: "Lantus", category: "Diabetes", description: "Long-acting insulin for diabetes.", type: "injection", dosage: "10 units", frequency: "Once daily" },
  { id: 34, medicineName: "Sitagliptin", commercialName: "Januvia", category: "Diabetes", description: "DPP-4 inhibitor for type 2 diabetes.", type: "tablet", dosage: "100mg", frequency: "Once daily" },
  { id: 35, medicineName: "Canagliflozin", commercialName: "Invokana", category: "Diabetes", description: "SGLT2 inhibitor for type 2 diabetes.", type: "tablet", dosage: "100mg", frequency: "Once daily" },
  { id: 36, medicineName: "Liraglutide", commercialName: "Victoza", category: "Diabetes", description: "GLP-1 receptor agonist for type 2 diabetes.", type: "injection", dosage: "1.2mg", frequency: "Once daily" },
  { id: 37, medicineName: "Acarbose", commercialName: "Precose", category: "Diabetes", description: "Alpha-glucosidase inhibitor for diabetes.", type: "tablet", dosage: "25mg", frequency: "Three times daily" },
  { id: 38, medicineName: "Dapagliflozin", commercialName: "Farxiga", category: "Diabetes", description: "SGLT2 inhibitor for type 2 diabetes.", type: "tablet", dosage: "5mg", frequency: "Once daily" },
  { id: 39, medicineName: "Exenatide", commercialName: "Byetta", category: "Diabetes", description: "GLP-1 receptor agonist for type 2 diabetes.", type: "injection", dosage: "5mcg", frequency: "Twice daily" },
  { id: 40, medicineName: "Rosiglitazone", commercialName: "Avandia", category: "Diabetes", description: "Thiazolidinedione for type 2 diabetes.", type: "tablet", dosage: "4mg", frequency: "Once daily" },

  // Category: Antibiotics
  { id: 41, medicineName: "Amoxicillin", commercialName: "Amoxil", category: "Antibiotics", description: "Broad-spectrum penicillin antibiotic.", type: "tablet", dosage: "500mg", frequency: "Every 8 hours" },
  { id: 42, medicineName: "Ciprofloxacin", commercialName: "Cipro", category: "Antibiotics", description: "Fluoroquinolone antibiotic.", type: "tablet", dosage: "500mg", frequency: "Every 12 hours" },
  { id: 43, medicineName: "Azithromycin", commercialName: "Zithromax", category: "Antibiotics", description: "Macrolide antibiotic.", type: "tablet", dosage: "250mg", frequency: "Once daily" },
  { id: 44, medicineName: "Clindamycin", commercialName: "Cleocin", category: "Antibiotics", description: "Lincosamide antibiotic.", type: "capsule", dosage: "300mg", frequency: "Every 6 hours" },
  { id: 45, medicineName: "Ceftriaxone", commercialName: "Rocephin", category: "Antibiotics", description: "Third-generation cephalosporin antibiotic.", type: "injection", dosage: "1g", frequency: "Once daily" },
  { id: 46, medicineName: "Metronidazole", commercialName: "Flagyl", category: "Antibiotics", description: "Antibacterial and antiprotozoal agent.", type: "tablet", dosage: "500mg", frequency: "Every 8 hours" },
  { id: 47, medicineName: "Vancomycin", commercialName: "Vancocin", category: "Antibiotics", description: "Glycopeptide antibiotic.", type: "injection", dosage: "1g", frequency: "Every 12 hours" },
  { id: 48, medicineName: "Doxycycline", commercialName: "Vibramycin", category: "Antibiotics", description: "Tetracycline antibiotic.", type: "tablet", dosage: "100mg", frequency: "Every 12 hours" },
  { id: 49, medicineName: "Nitrofurantoin", commercialName: "Macrobid", category: "Antibiotics", description: "Antibiotic for urinary tract infections.", type: "capsule", dosage: "100mg", frequency: "Every 12 hours" },
  { id: 50, medicineName: "Levofloxacin", commercialName: "Levaquin", category: "Antibiotics", description: "Fluoroquinolone antibiotic.", type: "tablet", dosage: "500mg", frequency: "Every 24 hours" },

  // Category: Allergies
  { id: 51, medicineName: "Fexofenadine", commercialName: "Allegra", category: "Allergies", description: "Antihistamine for allergy relief.", type: "tablet", dosage: "180mg", frequency: "Once daily" },
  { id: 52, medicineName: "Loratadine", commercialName: "Claritin", category: "Allergies", description: "Antihistamine for allergy relief.", type: "tablet", dosage: "10mg", frequency: "Once daily" },
  { id: 53, medicineName: "Desloratadine", commercialName: "Clarinex", category: "Allergies", description: "Antihistamine for allergy relief.", type: "tablet", dosage: "5mg", frequency: "Once daily" },
  { id: 54, medicineName: "Levocetirizine", commercialName: "Xyzal", category: "Allergies", description: "Antihistamine for allergy relief.", type: "tablet", dosage: "5mg", frequency: "Once daily" },
  { id: 55, medicineName: "Montelukast", commercialName: "Singulair", category: "Allergies", description: "Leukotriene receptor antagonist for allergies.", type: "tablet", dosage: "10mg", frequency: "Once daily" },
  { id: 56, medicineName: "Bepotastine", commercialName: "Bepreve", category: "Allergies", description: "Antihistamine eye drops for allergic conjunctivitis.", type: "eye drop", dosage: "0.7mg/ml", frequency: "Twice daily" },
  { id: 57, medicineName: "Ketotifen", commercialName: "Zaditor", category: "Allergies", description: "Antihistamine eye drops for allergic conjunctivitis.", type: "eye drop", dosage: "0.25%", frequency: "Twice daily" },
  { id: 58, medicineName: "Olopatadine", commercialName: "Pataday", category: "Allergies", description: "Antihistamine eye drops for allergic conjunctivitis.", type: "eye drop", dosage: "0.2%", frequency: "Once daily" },
  { id: 59, medicineName: "Fluticasone Propionate", commercialName: "Flonase", category: "Allergies", description: "Nasal spray for allergic rhinitis.", type: "spray", dosage: "50mcg", frequency: "Two sprays in each nostril once daily" },
  { id: 60, medicineName: "Budesonide", commercialName: "Rhinocort", category: "Allergies", description: "Nasal spray for allergic rhinitis.", type: "spray", dosage: "32mcg", frequency: "Two sprays in each nostril once daily" },

  // Category: Gastrointestinal Disorders
  { id: 61, medicineName: "Omeprazole", commercialName: "Prilosec", category: "Gastrointestinal Disorders", description: "Proton pump inhibitor for acid reflux.", type: "tablet", dosage: "20mg", frequency: "Once daily" },
  { id: 62, medicineName: "Esomeprazole", commercialName: "Nexium", category: "Gastrointestinal Disorders", description: "Proton pump inhibitor for acid reflux.", type: "tablet", dosage: "20mg", frequency: "Once daily" },
  { id: 63, medicineName: "Lansoprazole", commercialName: "Prevacid", category: "Gastrointestinal Disorders", description: "Proton pump inhibitor for acid reflux.", type: "tablet", dosage: "30mg", frequency: "Once daily" },
  { id: 64, medicineName: "Ranitidine", commercialName: "Zantac", category: "Gastrointestinal Disorders", description: "H2 antagonist for acid reflux.", type: "tablet", dosage: "150mg", frequency: "Twice daily" },
  { id: 65, medicineName: "Pantoprazole", commercialName: "Protonix", category: "Gastrointestinal Disorders", description: "Proton pump inhibitor for acid reflux.", type: "tablet", dosage: "40mg", frequency: "Once daily" },
  { id: 66, medicineName: "Sucralfate", commercialName: "Carafate", category: "Gastrointestinal Disorders", description: "Mucosal protectant for ulcers.", type: "tablet", dosage: "1g", frequency: "Four times daily" },
  { id: 67, medicineName: "Diphenoxylate/Atropine", commercialName: "Lomotil", category: "Gastrointestinal Disorders", description: "Antidiarrheal combination medication.", type: "tablet", dosage: "2.5mg/0.025mg", frequency: "Four times daily" },
  { id: 68, medicineName: "Bismuth Subsalicylate", commercialName: "Pepto-Bismol", category: "Gastrointestinal Disorders", description: "Antidiarrheal and stomach upset relief.", type: "suspension", dosage: "524mg", frequency: "Every 30 minutes as needed" },
  { id: 69, medicineName: "Metoclopramide", commercialName: "Reglan", category: "Gastrointestinal Disorders", description: "Prokinetic agent for nausea and vomiting.", type: "tablet", dosage: "10mg", frequency: "Three times daily" },
  { id: 70, medicineName: "Prochlorperazine", commercialName: "Compazine", category: "Gastrointestinal Disorders", description: "Antipsychotic for nausea and vomiting.", type: "tablet", dosage: "10mg", frequency: "Every 6 hours as needed" },

  // Category: Cardiovascular Disorders
  { id: 71, medicineName: "Lisinopril", commercialName: "Prinivil", category: "Cardiovascular Disorders", description: "ACE inhibitor for hypertension.", type: "tablet", dosage: "10mg", frequency: "Once daily" },
  { id: 72, medicineName: "Amlodipine", commercialName: "Norvasc", category: "Cardiovascular Disorders", description: "Calcium channel blocker for hypertension.", type: "tablet", dosage: "5mg", frequency: "Once daily" },
  { id: 73, medicineName: "Atorvastatin", commercialName: "Lipitor", category: "Cardiovascular Disorders", description: "Statin for cholesterol management.", type: "tablet", dosage: "10mg", frequency: "Once daily" },
  { id: 74, medicineName: "Simvastatin", commercialName: "Zocor", category: "Cardiovascular Disorders", description: "Statin for cholesterol management.", type: "tablet", dosage: "20mg", frequency: "Once daily" },
  { id: 75, medicineName: "Metoprolol", commercialName: "Lopressor", category: "Cardiovascular Disorders", description: "Beta-blocker for hypertension.", type: "tablet", dosage: "50mg", frequency: "Once daily" },
  { id: 76, medicineName: "Warfarin", commercialName: "Coumadin", category: "Cardiovascular Disorders", description: "Anticoagulant for blood thinning.", type: "tablet", dosage: "5mg", frequency: "Once daily" },
  { id: 77, medicineName: "Clopidogrel", commercialName: "Plavix", category: "Cardiovascular Disorders", description: "Antiplatelet agent for preventing strokes.", type: "tablet", dosage: "75mg", frequency: "Once daily" },
  { id: 78, medicineName: "Diltiazem", commercialName: "Cardizem", category: "Cardiovascular Disorders", description: "Calcium channel blocker for hypertension.", type: "tablet", dosage: "120mg", frequency: "Once daily" },
  { id: 79, medicineName: "Furosemide", commercialName: "Lasix", category: "Cardiovascular Disorders", description: "Diuretic for fluid retention.", type: "tablet", dosage: "20mg", frequency: "Once daily" },
  { id: 80, medicineName: "Hydrochlorothiazide", commercialName: "Microzide", category: "Cardiovascular Disorders", description: "Thiazide diuretic for hypertension.", type: "tablet", dosage: "12.5mg", frequency: "Once daily" },

  // Category: Pain Management
  { id: 81, medicineName: "Ibuprofen", commercialName: "Advil", category: "Pain Management", description: "NSAID for pain relief.", type: "tablet", dosage: "200mg", frequency: "Every 4 to 6 hours as needed" },
  { id: 82, medicineName: "Acetaminophen", commercialName: "Tylenol", category: "Pain Management", description: "Pain reliever and fever reducer.", type: "tablet", dosage: "500mg", frequency: "Every 4 to 6 hours as needed" },
  { id: 83, medicineName: "Aspirin", commercialName: "Bayer", category: "Pain Management", description: "NSAID for pain relief and anti-inflammatory.", type: "tablet", dosage: "325mg", frequency: "Every 4 to 6 hours as needed" },
  { id: 84, medicineName: "Naproxen", commercialName: "Aleve", category: "Pain Management", description: "NSAID for pain relief.", type: "tablet", dosage: "220mg", frequency: "Every 8 to 12 hours as needed" },
  { id: 85, medicineName: "Celecoxib", commercialName: "Celebrex", category: "Pain Management", description: "NSAID for pain and inflammation.", type: "capsule", dosage: "200mg", frequency: "Once daily" },
  { id: 86, medicineName: "Tramadol", commercialName: "Ultram", category: "Pain Management", description: "Opioid analgesic for moderate to severe pain.", type: "tablet", dosage: "50mg", frequency: "Every 4 to 6 hours as needed" },
  { id: 87, medicineName: "Morphine", commercialName: "MS Contin", category: "Pain Management", description: "Opioid analgesic for severe pain.", type: "tablet", dosage: "15mg", frequency: "Every 4 to 6 hours as needed" },
  { id: 88, medicineName: "Oxycodone", commercialName: "OxyContin", category: "Pain Management", description: "Opioid analgesic for moderate to severe pain.", type: "tablet", dosage: "10mg", frequency: "Every 12 hours as needed" },
  { id: 89, medicineName: "Hydrocodone/Acetaminophen", commercialName: "Norco", category: "Pain Management", description: "Combination opioid and non-opioid analgesic for moderate to severe pain.", type: "tablet", dosage: "5mg/325mg", frequency: "Every 6 hours as needed" },
  { id: 90, medicineName: "Fentanyl", commercialName: "Duragesic", category: "Pain Management", description: "Opioid analgesic for severe pain, available as a transdermal patch.", type: "patch", dosage: "25 mcg/hr", frequency: "Every 72 hours" },

  // Category: Mental Health
  { id: 91, medicineName: "Sertraline", commercialName: "Zoloft", category: "Mental Health", description: "SSRI for depression and anxiety.", type: "tablet", dosage: "50mg", frequency: "Once daily" },
  { id: 92, medicineName: "Fluoxetine", commercialName: "Prozac", category: "Mental Health", description: "SSRI for depression.", type: "capsule", dosage: "20mg", frequency: "Once daily" },
  { id: 93, medicineName: "Citalopram", commercialName: "Celexa", category: "Mental Health", description: "SSRI for depression.", type: "tablet", dosage: "20mg", frequency: "Once daily" },
  { id: 94, medicineName: "Escitalopram", commercialName: "Lexapro", category: "Mental Health", description: "SSRI for depression and anxiety.", type: "tablet", dosage: "10mg", frequency: "Once daily" },
  { id: 95, medicineName: "Venlafaxine", commercialName: "Effexor", category: "Mental Health", description: "SNRI for depression and anxiety.", type: "capsule", dosage: "75mg", frequency: "Once daily" },
  { id: 96, medicineName: "Bupropion", commercialName: "Wellbutrin", category: "Mental Health", description: "NDRI for depression.", type: "tablet", dosage: "100mg", frequency: "Once daily" },
  { id: 97, medicineName: "Duloxetine", commercialName: "Cymbalta", category: "Mental Health", description: "SNRI for depression and anxiety.", type: "capsule", dosage: "30mg", frequency: "Once daily" },
  { id: 98, medicineName: "Lithium", commercialName: "Lithobid", category: "Mental Health", description: "Mood stabilizer for bipolar disorder.", type: "tablet", dosage: "300mg", frequency: "Two to three times daily" },
  { id: 99, medicineName: "Aripiprazole", commercialName: "Abilify", category: "Mental Health", description: "Atypical antipsychotic for schizophrenia and bipolar disorder.", type: "tablet", dosage: "10mg", frequency: "Once daily" },
  { id: 100, medicineName: "Quetiapine", commercialName: "Seroquel", category: "Mental Health", description: "Atypical antipsychotic for schizophrenia and bipolar disorder.", type: "tablet", dosage: "300mg", frequency: "Once daily" },

  // Category: Antibiotics
  { id: 101, medicineName: "Amoxicillin", commercialName: "Amoxil", category: "Antibiotics", description: "Penicillin antibiotic for bacterial infections.", type: "tablet", dosage: "500mg", frequency: "Every 8 hours" },
  { id: 102, medicineName: "Azithromycin", commercialName: "Zithromax", category: "Antibiotics", description: "Macrolide antibiotic for bacterial infections.", type: "tablet", dosage: "500mg", frequency: "Once daily" },
  { id: 103, medicineName: "Ciprofloxacin", commercialName: "Cipro", category: "Antibiotics", description: "Fluoroquinolone antibiotic for bacterial infections.", type: "tablet", dosage: "500mg", frequency: "Every 12 hours" },
  { id: 104, medicineName: "Cephalexin", commercialName: "Keflex", category: "Antibiotics", description: "Cephalosporin antibiotic for bacterial infections.", type: "capsule", dosage: "500mg", frequency: "Every 6 hours" },
  { id: 105, medicineName: "Doxycycline", commercialName: "Vibramycin", category: "Antibiotics", description: "Tetracycline antibiotic for bacterial infections.", type: "tablet", dosage: "100mg", frequency: "Every 12 hours" },
  { id: 106, medicineName: "Clindamycin", commercialName: "Cleocin", category: "Antibiotics", description: "Lincosamide antibiotic for bacterial infections.", type: "capsule", dosage: "300mg", frequency: "Every 6 hours" },
  { id: 107, medicineName: "Metronidazole", commercialName: "Flagyl", category: "Antibiotics", description: "Antibiotic for bacterial infections and protozoal infections.", type: "tablet", dosage: "500mg", frequency: "Every 8 hours" },
  { id: 108, medicineName: "Levofloxacin", commercialName: "Levaquin", category: "Antibiotics", description: "Fluoroquinolone antibiotic for bacterial infections.", type: "tablet", dosage: "750mg", frequency: "Once daily" },
  { id: 109, medicineName: "Gentamicin", commercialName: "Garamycin", category: "Antibiotics", description: "Aminoglycoside antibiotic for bacterial infections.", type: "injection", dosage: "80mg", frequency: "Once daily" },
  { id: 110, medicineName: "Vancomycin", commercialName: "Vancocin", category: "Antibiotics", description: "Glycopeptide antibiotic for bacterial infections.", type: "injection", dosage: "1g", frequency: "Every 12 hours" },

  // Category: Allergies
  { id: 111, medicineName: "Loratadine", commercialName: "Claritin", category: "Allergies", description: "Antihistamine for allergic rhinitis.", type: "tablet", dosage: "10mg", frequency: "Once daily" },
  { id: 112, medicineName: "Cetirizine", commercialName: "Zyrtec", category: "Allergies", description: "Antihistamine for allergic rhinitis.", type: "tablet", dosage: "10mg", frequency: "Once daily" },
  { id: 113, medicineName: "Fexofenadine", commercialName: "Allegra", category: "Allergies", description: "Antihistamine for allergic rhinitis.", type: "tablet", dosage: "180mg", frequency: "Once daily" },
  { id: 114, medicineName: "Diphenhydramine", commercialName: "Benadryl", category: "Allergies", description: "First-generation antihistamine for allergies.", type: "tablet", dosage: "25mg", frequency: "Every 4 to 6 hours as needed" },
  { id: 115, medicineName: "Hydroxyzine", commercialName: "Atarax", category: "Allergies", description: "Antihistamine for anxiety and allergies.", type: "tablet", dosage: "10mg", frequency: "Once daily" },
  { id: 116, medicineName: "Montelukast", commercialName: "Singulair", category: "Allergies", description: "Leukotriene receptor antagonist for asthma and allergies.", type: "tablet", dosage: "10mg", frequency: "Once daily" },
  { id: 117, medicineName: "Beclomethasone", commercialName: "Qvar", category: "Allergies", description: "Inhaled corticosteroid for asthma.", type: "inhalation", dosage: "40mcg", frequency: "Twice daily" },
  { id: 118, medicineName: "Fluticasone", commercialName: "Flovent", category: "Allergies", description: "Inhaled corticosteroid for asthma.", type: "inhalation", dosage: "100mcg", frequency: "Twice daily" },
  { id: 119, medicineName: "Albuterol", commercialName: "ProAir", category: "Allergies", description: "Short-acting bronchodilator for asthma.", type: "inhalation", dosage: "90mcg", frequency: "Every 4 to 6 hours as needed" },
  { id: 120, medicineName: "Levocetirizine", commercialName: "Xyzal", category: "Allergies", description: "Antihistamine for allergic rhinitis.", type: "tablet", dosage: "5mg", frequency: "Once daily" },

  // Category: Hormonal Disorders
  { id: 121, medicineName: "Levothyroxine", commercialName: "Synthroid", category: "Hormonal Disorders", description: "Thyroid hormone replacement for hypothyroidism.", type: "tablet", dosage: "75mcg", frequency: "Once daily" },
  { id: 122, medicineName: "Insulin", commercialName: "Humulin", category: "Hormonal Disorders", description: "Insulin for diabetes management.", type: "injection", dosage: "Varies", frequency: "As directed" },
  { id: 123, medicineName: "Metformin", commercialName: "Glucophage", category: "Hormonal Disorders", description: "Biguanide for type 2 diabetes.", type: "tablet", dosage: "500mg", frequency: "Twice daily" },
  { id: 124, medicineName: "Glipizide", commercialName: "Glucotrol", category: "Hormonal Disorders", description: "Sulfonylurea for type 2 diabetes.", type: "tablet", dosage: "5mg", frequency: "Once daily" },
  { id: 125, medicineName: "Pioglitazone", commercialName: "Actos", category: "Hormonal Disorders", description: "Thiazolidinedione for type 2 diabetes.", type: "tablet", dosage: "15mg", frequency: "Once daily" },
  { id: 126, medicineName: "Dexamethasone", commercialName: "Decadron", category: "Hormonal Disorders", description: "Corticosteroid for inflammation and allergies.", type: "tablet", dosage: "0.75mg", frequency: "Once daily" },
  { id: 127, medicineName: "Hydrocortisone", commercialName: "Cortef", category: "Hormonal Disorders", description: "Corticosteroid for adrenal insufficiency.", type: "tablet", dosage: "20mg", frequency: "Once daily" },
  { id: 128, medicineName: "Estradiol", commercialName: "Estrace", category: "Hormonal Disorders", description: "Estrogen hormone replacement for menopausal symptoms.", type: "tablet", dosage: "1mg", frequency: "Once daily" },
  { id: 129, medicineName: "Testosterone", commercialName: "AndroGel", category: "Hormonal Disorders", description: "Testosterone replacement for hypogonadism.", type: "gel", dosage: "50mg", frequency: "Once daily" },
  { id: 130, medicineName: "Progesterone", commercialName: "Prometrium", category: "Hormonal Disorders", description: "Hormonal treatment for menstrual disorders.", type: "capsule", dosage: "100mg", frequency: "Once daily" },

  // Category: Pain Management
  { id: 131, medicineName: "Ibuprofen", commercialName: "Advil", category: "Pain Management", description: "NSAID for pain and inflammation.", type: "tablet", dosage: "200mg", frequency: "Every 4 to 6 hours as needed" },
  { id: 132, medicineName: "Acetaminophen", commercialName: "Tylenol", category: "Pain Management", description: "Pain reliever and fever reducer.", type: "tablet", dosage: "500mg", frequency: "Every 4 to 6 hours as needed" },
  { id: 133, medicineName: "Naproxen", commercialName: "Aleve", category: "Pain Management", description: "NSAID for pain and inflammation.", type: "tablet", dosage: "250mg", frequency: "Every 8 to 12 hours as needed" },
  { id: 134, medicineName: "Aspirin", commercialName: "Bayer", category: "Pain Management", description: "NSAID for pain, inflammation, and fever.", type: "tablet", dosage: "81mg", frequency: "Once daily" },
  { id: 135, medicineName: "Celecoxib", commercialName: "Celebrex", category: "Pain Management", description: "COX-2 inhibitor for pain and inflammation.", type: "capsule", dosage: "200mg", frequency: "Once daily" },
  { id: 136, medicineName: "Gabapentin", commercialName: "Neurontin", category: "Pain Management", description: "Anticonvulsant for nerve pain.", type: "capsule", dosage: "300mg", frequency: "Three times daily" },
  { id: 137, medicineName: "Tramadol", commercialName: "Ultram", category: "Pain Management", description: "Opioid for moderate to severe pain.", type: "tablet", dosage: "50mg", frequency: "Every 4 to 6 hours as needed" },
  { id: 138, medicineName: "Morphine", commercialName: "MS Contin", category: "Pain Management", description: "Opioid for severe pain.", type: "tablet", dosage: "15mg", frequency: "Every 4 hours as needed" },
  { id: 139, medicineName: "Oxycodone", commercialName: "OxyContin", category: "Pain Management", description: "Opioid for severe pain.", type: "tablet", dosage: "10mg", frequency: "Every 12 hours as needed" },
  { id: 140, medicineName: "Fentanyl", commercialName: "Duragesic", category: "Pain Management", description: "Potent opioid for severe pain.", type: "patch", dosage: "25mcg/hour", frequency: "Every 72 hours" },

  // Category: Cardiovascular Health
  { id: 141, medicineName: "Amlodipine", commercialName: "Norvasc", category: "Cardiovascular Health", description: "Calcium channel blocker for hypertension.", type: "tablet", dosage: "5mg", frequency: "Once daily" },
  { id: 142, medicineName: "Lisinopril", commercialName: "Prinivil", category: "Cardiovascular Health", description: "ACE inhibitor for hypertension and heart failure.", type: "tablet", dosage: "10mg", frequency: "Once daily" },
  { id: 143, medicineName: "Atorvastatin", commercialName: "Lipitor", category: "Cardiovascular Health", description: "Statin for hyperlipidemia.", type: "tablet", dosage: "20mg", frequency: "Once daily" },
  { id: 144, medicineName: "Simvastatin", commercialName: "Zocor", category: "Cardiovascular Health", description: "Statin for hyperlipidemia.", type: "tablet", dosage: "20mg", frequency: "Once daily" },
  { id: 145, medicineName: "Metoprolol", commercialName: "Lopressor", category: "Cardiovascular Health", description: "Beta-blocker for hypertension and heart failure.", type: "tablet", dosage: "50mg", frequency: "Once daily" },
  { id: 146, medicineName: "Clopidogrel", commercialName: "Plavix", category: "Cardiovascular Health", description: "Antiplatelet for cardiovascular disease prevention.", type: "tablet", dosage: "75mg", frequency: "Once daily" },
  { id: 147, medicineName: "Warfarin", commercialName: "Coumadin", category: "Cardiovascular Health", description: "Anticoagulant for thromboembolism prevention.", type: "tablet", dosage: "5mg", frequency: "Once daily" },
  { id: 148, medicineName: "Digoxin", commercialName: "Lanoxin", category: "Cardiovascular Health", description: "Cardiac glycoside for heart failure.", type: "tablet", dosage: "0.125mg", frequency: "Once daily" },
  { id: 149, medicineName: "Diltiazem", commercialName: "Cardizem", category: "Cardiovascular Health", description: "Calcium channel blocker for hypertension.", type: "tablet", dosage: "120mg", frequency: "Once daily" },
  { id: 150, medicineName: "Sotalol", commercialName: "Betapace", category: "Cardiovascular Health", description: "Antiarrhythmic for atrial fibrillation.", type: "tablet", dosage: "80mg", frequency: "Twice daily" },

  // Category: Gastrointestinal Health
  { id: 151, medicineName: "Omeprazole", commercialName: "Prilosec", category: "Gastrointestinal Health", description: "Proton pump inhibitor for GERD.", type: "tablet", dosage: "20mg", frequency: "Once daily" },
  { id: 152, medicineName: "Ranitidine", commercialName: "Zantac", category: "Gastrointestinal Health", description: "H2 antagonist for GERD.", type: "tablet", dosage: "150mg", frequency: "Once daily" },
  { id: 153, medicineName: "Lansoprazole", commercialName: "Prevacid", category: "Gastrointestinal Health", description: "Proton pump inhibitor for GERD.", type: "tablet", dosage: "30mg", frequency: "Once daily" },
  { id: 154, medicineName: "Metoclopramide", commercialName: "Reglan", category: "Gastrointestinal Health", description: "Prokinetic agent for nausea and vomiting.", type: "tablet", dosage: "10mg", frequency: "Three times daily" },
  { id: 155, medicineName: "Docusate", commercialName: "Colace", category: "Gastrointestinal Health", description: "Stool softener for constipation.", type: "capsule", dosage: "100mg", frequency: "Once daily" },
  { id: 156, medicineName: "Bismuth subsalicylate", commercialName: "Pepto-Bismol", category: "Gastrointestinal Health", description: "Antidiarrheal for upset stomach and diarrhea.", type: "tablet", dosage: "262mg", frequency: "Every 30 minutes to 1 hour as needed" },
  { id: 157, medicineName: "Sodium phosphate", commercialName: "Fleet Phospho-soda", category: "Gastrointestinal Health", description: "Saline laxative for bowel cleansing.", type: "liquid", dosage: "Varies", frequency: "As directed" },
  { id: 158, medicineName: "Mesalamine", commercialName: "Asacol", category: "Gastrointestinal Health", description: "Anti-inflammatory for ulcerative colitis.", type: "tablet", dosage: "400mg", frequency: "Three times daily" },
  { id: 159, medicineName: "Prochlorperazine", commercialName: "Compazine", category: "Gastrointestinal Health", description: "Antipsychotic for severe nausea and vomiting.", type: "tablet", dosage: "5mg", frequency: "Every 6 to 8 hours as needed" },
  { id: 160, medicineName: "Loperamide", commercialName: "Imodium", category: "Gastrointestinal Health", description: "Antidiarrheal for diarrhea.", type: "tablet", dosage: "2mg", frequency: "After the first loose stool, then 1mg after each subsequent loose stool" },

  // Category: Respiratory Health
  { id: 161, medicineName: "Albuterol", commercialName: "ProAir", category: "Respiratory Health", description: "Bronchodilator for asthma and COPD.", type: "inhalation", dosage: "90mcg", frequency: "Every 4 to 6 hours as needed" },
  { id: 162, medicineName: "Montelukast", commercialName: "Singulair", category: "Respiratory Health", description: "Leukotriene receptor antagonist for asthma.", type: "tablet", dosage: "10mg", frequency: "Once daily" },
  { id: 163, medicineName: "Fluticasone", commercialName: "Flovent", category: "Respiratory Health", description: "Corticosteroid for asthma.", type: "inhalation", dosage: "44mcg", frequency: "Twice daily" },
  { id: 164, medicineName: "Budesonide", commercialName: "Pulmicort", category: "Respiratory Health", description: "Corticosteroid for asthma and COPD.", type: "inhalation", dosage: "180mcg", frequency: "Twice daily" },
  { id: 165, medicineName: "Ipratropium", commercialName: "Atrovent", category: "Respiratory Health", description: "Anticholinergic for COPD.", type: "inhalation", dosage: "20mcg", frequency: "Four times daily" },
  { id: 166, medicineName: "Theophylline", commercialName: "Theo-Dur", category: "Respiratory Health", description: "Methylxanthine for asthma and COPD.", type: "tablet", dosage: "200mg", frequency: "Every 12 hours" },
  { id: 167, medicineName: "Dextromethorphan", commercialName: "Robitussin", category: "Respiratory Health", description: "Cough suppressant for cough relief.", type: "syrup", dosage: "10mg/5ml", frequency: "Every 6 to 8 hours as needed" },
  { id: 168, medicineName: "Guaifenesin", commercialName: "Mucinex", category: "Respiratory Health", description: "Expectorant for mucus relief.", type: "tablet", dosage: "600mg", frequency: "Every 12 hours" },
  { id: 169, medicineName: "Phenylephrine", commercialName: "Sudafed PE", category: "Respiratory Health", description: "Decongestant for nasal congestion.", type: "tablet", dosage: "10mg", frequency: "Every 4 hours as needed" },
  { id: 170, medicineName: "Pseudoephedrine", commercialName: "Sudafed", category: "Respiratory Health", description: "Decongestant for nasal congestion.", type: "tablet", dosage: "60mg", frequency: "Every 4 to 6 hours as needed" },

  // Category: Neurological Health
  { id: 171, medicineName: "Sertraline", commercialName: "Zoloft", category: "Neurological Health", description: "SSRI for depression and anxiety.", type: "tablet", dosage: "50mg", frequency: "Once daily" },
  { id: 172, medicineName: "Fluoxetine", commercialName: "Prozac", category: "Neurological Health", description: "SSRI for depression.", type: "tablet", dosage: "20mg", frequency: "Once daily" },
  { id: 173, medicineName: "Bupropion", commercialName: "Wellbutrin", category: "Neurological Health", description: "NDRI for depression.", type: "tablet", dosage: "150mg", frequency: "Twice daily" },
  { id: 174, medicineName: "Citalopram", commercialName: "Celexa", category: "Neurological Health", description: "SSRI for depression.", type: "tablet", dosage: "20mg", frequency: "Once daily" },
  { id: 175, medicineName: "Trazodone", commercialName: "Desyrel", category: "Neurological Health", description: "Antidepressant for depression and insomnia.", type: "tablet", dosage: "50mg", frequency: "Once daily" },
  { id: 176, medicineName: "Gabapentin", commercialName: "Neurontin", category: "Neurological Health", description: "Anticonvulsant for nerve pain.", type: "capsule", dosage: "300mg", frequency: "Three times daily" },
  { id: 177, medicineName: "Lamotrigine", commercialName: "Lamictal", category: "Neurological Health", description: "Anticonvulsant for epilepsy.", type: "tablet", dosage: "100mg", frequency: "Once daily" },
  { id: 178, medicineName: "Carbamazepine", commercialName: "Tegretol", category: "Neurological Health", description: "Anticonvulsant for epilepsy and neuropathic pain.", type: "tablet", dosage: "200mg", frequency: "Twice daily" },
  { id: 179, medicineName: "Topiramate", commercialName: "Topamax", category: "Neurological Health", description: "Anticonvulsant for epilepsy and migraine prevention.", type: "tablet", dosage: "50mg", frequency: "Once daily" },
  { id: 180, medicineName: "Risperidone", commercialName: "Risperdal", category: "Neurological Health", description: "Antipsychotic for schizophrenia and bipolar disorder.", type: "tablet", dosage: "1mg", frequency: "Once daily" },

  // Category: Infectious Diseases
  { id: 181, medicineName: "Amoxicillin", commercialName: "Amoxil", category: "Infectious Diseases", description: "Penicillin antibiotic for bacterial infections.", type: "capsule", dosage: "500mg", frequency: "Every 8 hours" },
  { id: 182, medicineName: "Azithromycin", commercialName: "Zithromax", category: "Infectious Diseases", description: "Macrolide antibiotic for bacterial infections.", type: "tablet", dosage: "250mg", frequency: "Once daily" },
  { id: 183, medicineName: "Ciprofloxacin", commercialName: "Cipro", category: "Infectious Diseases", description: "Fluoroquinolone antibiotic for bacterial infections.", type: "tablet", dosage: "500mg", frequency: "Every 12 hours" },
  { id: 184, medicineName: "Metronidazole", commercialName: "Flagyl", category: "Infectious Diseases", description: "Antibiotic for bacterial and parasitic infections.", type: "tablet", dosage: "500mg", frequency: "Every 8 hours" },
  { id: 185, medicineName: "Clindamycin", commercialName: "Cleocin", category: "Infectious Diseases", description: "Lincosamide antibiotic for bacterial infections.", type: "capsule", dosage: "300mg", frequency: "Every 6 hours" },
  { id: 186, medicineName: "Doxycycline", commercialName: "Vibramycin", category: "Infectious Diseases", description: "Tetracycline antibiotic for bacterial infections.", type: "capsule", dosage: "100mg", frequency: "Every 12 hours" },
  { id: 187, medicineName: "Vancomycin", commercialName: "Vancocin", category: "Infectious Diseases", description: "Glycopeptide antibiotic for severe bacterial infections.", type: "injection", dosage: "1000mg", frequency: "Every 12 hours" },
  { id: 188, medicineName: "Acyclovir", commercialName: "Zovirax", category: "Infectious Diseases", description: "Antiviral for herpes infections.", type: "tablet", dosage: "400mg", frequency: "Three times daily" },
  { id: 189, medicineName: "Oseltamivir", commercialName: "Tamiflu", category: "Infectious Diseases", description: "Antiviral for influenza.", type: "capsule", dosage: "75mg", frequency: "Twice daily" },
  { id: 190, medicineName: "Sofosbuvir", commercialName: "Sovaldi", category: "Infectious Diseases", description: "Antiviral for hepatitis C.", type: "tablet", dosage: "400mg", frequency: "Once daily" }
];

const articles = [
  {
    id: 1,
    title: "Understanding the Common Cold",
    url: "https://medlineplus.gov/commoncold.html#:~:text=The%20common%20cold%20is%20a,get%20them%20at%20any%20time.",
    description: "mild infection of your upper respiratory tract (which includes your nose and throat)",
  },
  {
    id: 2,
    title: "Influenza: What You Need to Know",
    url: "https://www.who.int/news-room/fact-sheets/detail/influenza-(seasonal)?gad_source=1&gclid=Cj0KCQiA_qG5BhDTARIsAA0UHSLQxNLzSLQbYSQ32oP6KSvlHfKy-AnwwccNkJ9K_s-FWehUhttH5zMaArQwEALw_wcB",
    description: "An overview of influenza, its symptoms, and prevention methods.",
  },
  {
    id: 3,
    title: "Allergies: Types and Treatments",
    url: "https://www.doconline.com/what-we-treat/allergies",
    description: "Information about different types of allergies and how to manage them.",
  },
  {
    id: 4,
    title: "Understanding Asthma",
    url: "https://asthma.ca/get-help/understanding-asthma/",
    description: "Asthma is a chronic (long-term) condition that affects the airways in the lungs. The airways are tubes that carry air in and out of your lungs. If you have asthma, your airways can become inflamed and narrowed at times. This makes it harder for air to flow out of your airways when you breathe out.",
  },
  {
    id: 5,
    title: "What is COVID-19?",
    url: "https://www.who.int/health-topics/coronavirus#tab=tab_1",
    description: "COVID-19 is the disease caused by the SARS-CoV-2 coronavirus. It usually spreads between people in close contact.",
  },
  {
    id: 6,
    title: "Understanding Infectious Diseases",
    url: "https://www.mayoclinic.org/diseases-conditions/infectious-diseases/symptoms-causes/syc-20351173",
    description: "Infectious diseases are disorders caused by organisms — such as bacteria, viruses, fungi or parasites. Many organisms live in and on our bodies. They're normally harmless or even helpful.",
  },
  {
    id: 7,
    title: "Respiratory Health: Keeping Your Lungs Healthy",
    url: "https://www.lung.org/lung-health-diseases/wellness/protecting-your-lungs",
    description: "Tips and strategies for maintaining good respiratory health and preventing lung diseases.",
  },
  {
    id: 8,
    title: "Gastrointestinal Health: Understanding Your Gut",
    url: "https://www.betterhealth.vic.gov.au/health/healthyliving/gut-health#:~:text=Your%20gut%20bacteria%20are%20influenced,%2C%20beans%2C%20nuts%20and%20wholegrains.",
    description: "Your gut bacteria are influenced by what you eat. It is important to give them the right fuel to have a balanced gut microbiome. The best way to maintain a healthy microbiome is to eat a range of fresh, wholefoods, mainly from plant sources like fruits, vegetables, legumes, beans, nuts and wholegrains.",
  },
  {
    id: 9,
    title: "Cardiovascular Health: Keeping Your Heart Healthy",
    url: "https://www.heartfoundation.org.au/healthy-living/keeping-your-heart-healthy",
    description: "Information on how to maintain cardiovascular health and prevent heart disease.",
  },
  {
    id: 10,
    title: "Pain Management: Strategies for Relief",
    url: "https://www.betterhealth.vic.gov.au/health/conditionsandtreatments/pain-and-pain-management-adults",
    description: "Explore various pain management techniques and therapies to alleviate chronic pain.",
  },
  {
    id: 11,
    title: "Mental Health: Importance and Awareness",
    url: "https://www.nami.org/learn-more/mental-health-conditions",
    description: "A guide to understanding mental health, its importance, and how to seek help.",
  },
  {
    id: 12,
    title: "Diabetes: Managing Your Health",
    url: "https://www.niddk.nih.gov/health-information/diabetes/overview/managing-diabetes",
    description: "Comprehensive resources on diabetes management, prevention, and treatment.",
  },
  {
    id: 13,
    title: "Understanding Hypertension",
    url: "https://www.who.int/health-topics/hypertension#tab=tab_1",
    description: "Information on hypertension, its risks, and how to manage high blood pressure.",
  }
];

app.get('/api/articles', (req, res) => {
  res.json(articles);
});

// Get article by ID
app.get('/api/articles/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const article = articles.find(a => a.id === id);
  if (article) {
    res.json(article);
  } else {
    res.status(404).json({ message: "Article not found" });
  }
});
// Routes

// Get all medicines
app.get('/api/medicines', (req, res) => {
  res.json(medicines);
});

// Get medicine by category
app.get('/api/medicines/category/:category', (req, res) => {
  const category = req.params.category;
  const filteredMedicines = medicines.filter(m => m.category.toLowerCase() === category.toLowerCase());
  res.json(filteredMedicines);
});

// Get medicine by ID
app.get('/api/medicines/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const medicine = medicines.find(m => m.id === id);
  if (medicine) {
    res.json(medicine);
  } else {
    res.status(404).json({ message: "Medicine not found" });
  }
});

// Create a new medicine
app.post('/api/medicines', (req, res) => {
  const newMedicine = {
    id: medicines.length + 1,
    ...req.body
  };
  medicines.push(newMedicine);
  res.status(201).json(newMedicine);
});

// Update a medicine by ID
app.put('/api/medicines/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = medicines.findIndex(m => m.id === id);
  if (index !== -1) {
    medicines[index] = { id, ...req.body };
    res.json(medicines[index]);
  } else {
    res.status(404).json({ message: "Medicine not found" });
  }
});

// Delete a medicine by ID
app.delete('/api/medicines/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = medicines.findIndex(m => m.id === id);
  if (index !== -1) {
    medicines.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ message: "Medicine not found" });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
