// Appointment planning is editorial guidance, independent of a branch's listed services.
export const specialityGroups = [
  { id:"everyday", name:"First visits & preventive care", ids:["general","vaccination","dentistry","exotics","gynaecology"] },
  { id:"medicine", name:"Specialist medicine", ids:["dermatology","ophthalmology","oncology","internal","cardiology","gastroenterology","neurology"] },
  { id:"procedures", name:"Emergency, procedures & recovery", ids:["emergency","orthopedics","surgery","imaging","physiotherapy"] }
];

export const visitNotes: Record<string,{bring:string;ask:string}> = {
  general:{bring:"Bring the vaccine record, current medicines and a short timeline of changes in eating, drinking, toileting or activity.",ask:"Which changes should prompt a call before the follow-up visit?"},
  vaccination:{bring:"Bring dated vaccine records, including rabies, and the names of any flea, tick or worm treatments. Mention travel and boarding plans.",ask:"Which vaccines and parasite checks fit my animal’s age and exposure, and when are they next due?"},
  dentistry:{bring:"Note changes in chewing, dropped food or bleeding that you have already seen. Bring previous dental records if available.",ask:"If a dental procedure is advised, what does the estimate include for imaging, anaesthesia and aftercare?"},
  exotics:{bring:"Call with the exact species. Bring a diet list and photos of the enclosure, lighting and heating setup.",ask:"Does the clinician regularly see this species, and how should I transport it to the appointment?"},
  gynaecology:{bring:"Bring breeding or pregnancy dates if known, prior scan reports and details of previous litters.",ask:"Which signs during pregnancy or labour require an immediate call, and who can receive an emergency?"},
  dermatology:{bring:"Bring photos of how the skin changed, a list of foods and treats, and the packaging of shampoos and parasite products used.",ask:"Should I change the usual bathing routine before the examination, and which tests could be done at this visit?"},
  ophthalmology:{bring:"Bring eye-drop bottles and previous examination notes. Record when squinting, discharge or a change in vision began.",ask:"Can the eye service assess this problem today? For a painful or injured eye, call promptly."},
  oncology:{bring:"Bring pathology and imaging reports. Ask the referral team whether it needs the original slides, samples or image files.",ask:"Is this visit for assessment, treatment planning or both, and which decisions can wait for test results?"},
  internal:{bring:"Gather previous blood and urine results with their dates, imaging reports and the current medicine list.",ask:"Does the clinician want original test results or any preparation before the first visit?"},
  cardiology:{bring:"Bring previous heart scans or ECGs, prescriptions and notes on changes in activity or breathing.",ask:"Will the consultation and any recommended heart scan be available at the same branch?"},
  gastroenterology:{bring:"Keep a food diary and record vomiting or stool changes. Ask the clinic before collecting or transporting a sample.",ask:"Should feeding continue as usual before the appointment, and which records would help avoid repeating tests?"},
  neurology:{bring:"Bring a timeline and a short video of an episode if one was recorded safely. Include how long recovery took.",ask:"Which changes need immediate attention, and is further imaging available locally if recommended?"},
  emergency:{bring:"Call while arranging transport. Give the species, size, main problem and expected arrival time. Take medicine packs or records if they are at hand.",ask:"Can the team receive my animal now, and which entrance should I use?"},
  orthopedics:{bring:"Bring earlier X-rays and reports, the date the limp or injury started, and any medicines already prescribed.",ask:"Can the clinician review the original images, and what help might my animal need getting into the clinic?"},
  surgery:{bring:"Bring referral notes, current medicines and any recent test results. Ask the surgical team for its own food and water instructions.",ask:"What is included in the estimate, who monitors recovery and how do I reach the team after discharge?"},
  imaging:{bring:"Bring the referring clinician’s request, earlier scans and the part of the body being investigated.",ask:"Which imaging service is available at this branch, is preparation needed and how will my vet receive the report?"},
  physiotherapy:{bring:"Bring the diagnosis, operation notes and any activity restrictions from the treating veterinarian.",ask:"What should the first session assess, and how will the rehabilitation team share progress with my vet?"}
};
