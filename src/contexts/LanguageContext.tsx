import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Language = "en" | "ar";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, replacements?: Record<string, string | number>) => string;
  isRTL: boolean;
}

const translations: Record<string, Record<Language, string>> = {
  // Splash
  "splash.tagline": { en: "A plan that adapts to your week", ar: "خطة تتكيّف مع أسبوعك" },
  "splash.tap": { en: "Tap to start", ar: "انقر للبدء" },

  // Intro Slider
  "intro.slide1_title": { en: "Know what to train today", ar: "اعرف وش تمرن اليوم" },
  "intro.slide1_subtitle": { en: "Know exactly the best workout for building muscle", ar: "تعرف بالضبط وش أفضل تمرين تسويه لبناء العضلات" },
  "intro.slide2_title": { en: "We factor in your other sports", ar: "نحسب رياضاتك الثانية" },
  "intro.slide2_subtitle": { en: "We don't give you exercises for them, but we consider them when building your plan", ar: "ما نعطيك تمارين لها، لكن ناخذها بعين الاعتبار لما نبني خطتك" },
  "intro.slide3_title": { en: "A plan that fits your situation", ar: "خطة تناسب وضعك" },
  "intro.slide3_subtitle": { en: "We consider your injuries, time, and even your available equipment", ar: "نراعي إصاباتك ووقتك وحتى معداتك المتوفرة" },
  "intro.slide4_title": { en: "Your effort won't go to waste", ar: "جهدك لا يضيع" },
  "intro.slide4_subtitle": { en: "Without a plan that fits you, you might put in a lot of effort with no clear progress", ar: "بدون خطة تناسبك، ممكن تبذل جهد كثير بدون تقدم واضح" },
  "intro.start": { en: "Start Now", ar: "ابدأ الآن" },
  "intro.next": { en: "Next", ar: "التالي" },

  // Common
  "continue": { en: "Continue", ar: "متابعة" },
  "step_of": { en: "Step {x} of {y}", ar: "الخطوة {x} من {y}" },
  "back": { en: "Back", ar: "رجوع" },
  "skip": { en: "Skip", ar: "تخطي" },

  // Gender
  "gender.title1": { en: "What's your", ar: "ما هو" },
  "gender.title2": { en: "gender?", ar: "جنسك؟" },
  "gender.male": { en: "Male", ar: "ذكر" },
  "gender.female": { en: "Female", ar: "أنثى" },

  // Height
  "height.title1": { en: "How tall", ar: "كم يبلغ" },
  "height.title2": { en: "are you?", ar: "طولك؟" },
  "height.cm": { en: "cm", ar: "سم" },
  "height.inch": { en: "inch", ar: "إنش" },
  "height.ft": { en: "ft", ar: "قدم" },

  // Weight
  "weight.title1": { en: "What's your", ar: "كم يبلغ" },
  "weight.title2": { en: "weight?", ar: "وزنك؟" },
  "weight.kg": { en: "kg", ar: "كغ" },
  "weight.lbs": { en: "lbs", ar: "باوند" },

  // Birthdate
  "birthdate.title1": { en: "When were", ar: "ما هو تاريخ" },
  "birthdate.title2": { en: "you born?", ar: "ميلادك؟" },
  "birthdate.hint": { en: "Enter your date of birth", ar: "أدخل تاريخ ميلادك" },
  "birthdate.day": { en: "Day", ar: "يوم" },
  "birthdate.month": { en: "Month", ar: "شهر" },
  "birthdate.year": { en: "Year", ar: "سنة" },

  // Name
  "name.title1": { en: "What's your", ar: "ما هو" },
  "name.title2": { en: "name?", ar: "اسمك؟" },
  "name.hint": { en: "We'll personalize your experience", ar: "سنخصّص تجربتك" },
  "name.placeholder": { en: "Enter your name", ar: "أدخل اسمك" },

  // Phone
  "phone.title1": { en: "Enter your", ar: "أدخل رقم" },
  "phone.title2": { en: "phone number", ar: "هاتفك" },
  "phone.hint": { en: "We'll send a verification code", ar: "سنرسل لك رمز تحقق" },
  "phone.send": { en: "Send Code", ar: "إرسال الرمز" },

  // OTP
  "otp.title": { en: "Verify your number", ar: "تحقّق من رقمك" },
  "otp.hint": { en: "Enter the 6-digit code we sent you", ar: "أدخل الرمز المكوّن من 6 أرقام" },
  "otp.resend": { en: "Didn't receive a code? Resend", ar: "لم يصلك الرمز؟ أعد الإرسال" },
  "otp.verify": { en: "Verify", ar: "تحقّق" },

  // Verified
  "verified.title": { en: "You're verified", ar: "تم التحقق بنجاح" },
  "verified.welcome_user": { en: "Welcome, {name}. ", ar: "أهلاً {name}. " },
  "verified.welcome": { en: "Welcome to Metafi. ", ar: "أهلاً بك في Metafi. " },
  "verified.desc": { en: "Let's build your personalized training plan.", ar: "لنبدأ ببناء خطتك التدريبية المخصصة." },
  "verified.start": { en: "Get Started", ar: "لنبدأ" },

  // Home
  "home.welcome_back": { en: "Welcome back", ar: "أهلاً بعودتك" },
  "home.hi": { en: "Hi, {name}", ar: "أهلاً {name}" },
  "home.this_week": { en: "This Week", ar: "هذا الأسبوع" },
  "home.sessions": { en: "{n} sessions", ar: "{n} جلسات" },
  "home.streak": { en: "Streak", ar: "سلسلة" },
  "home.days": { en: "{n} days", ar: "{n} أيام" },
  "home.create_plan": { en: "Create Your Plan", ar: "أنشئ خطتك" },
  "home.create_desc": { en: "Build a personalized training plan based on your schedule, sports, and goals.", ar: "ابنِ خطة تدريب مخصصة بناءً على جدولك ورياضاتك وأهدافك." },
  "home.get_started": { en: "Get Started", ar: "ابدأ الآن" },
  "nav.home": { en: "Home", ar: "الرئيسية" },
  "nav.plan": { en: "Plan", ar: "الخطة" },
  "nav.profile": { en: "Profile", ar: "الملف" },

  // Profile
  "profile.title": { en: "Profile", ar: "الملف الشخصي" },
  "profile.pro": { en: "PRO", ar: "PRO" },
  "profile.workout": { en: "Workout", ar: "التمرين" },
  "profile.change_plan": { en: "Change Plan", ar: "تغيير الخطة" },
  "profile.personal_info": { en: "Personal Info", ar: "المعلومات الشخصية" },
  "profile.account": { en: "Account", ar: "الحساب" },
  "profile.subscription": { en: "Subscription", ar: "الاشتراك" },
  "profile.contact_us": { en: "Contact Us", ar: "تواصل معنا" },
  "profile.legal": { en: "Legal", ar: "قانوني" },
  "profile.privacy_policy": { en: "Privacy Policy", ar: "سياسة الخصوصية" },
  "profile.terms": { en: "Terms of Service", ar: "شروط الاستخدام" },
  "profile.language": { en: "Language", ar: "اللغة" },

  // Personal Info
  "personal.name": { en: "Name", ar: "الاسم" },
  "personal.age": { en: "Age", ar: "العمر" },
  "personal.weight_label": { en: "Weight", ar: "الوزن" },
  "personal.height_label": { en: "Height", ar: "الطول" },
  "personal.subtitle": { en: "Update your personal details", ar: "حدّث معلوماتك الشخصية" },
  "personal.save": { en: "Save", ar: "حفظ" },

  // Subscription
  "sub.title": { en: "Metafi Pro", ar: "Metafi Pro" },
  "sub.subtitle": { en: "Unlock the full experience", ar: "افتح التجربة الكاملة" },
  "sub.month": { en: "month", ar: "شهر" },
  "sub.feature1": { en: "Personalized adaptive plans", ar: "خطط تدريبية تتكيّف معك" },
  "sub.feature2": { en: "Sport-aware scheduling", ar: "جدولة تراعي رياضاتك" },
  "sub.feature3": { en: "Injury-adapted exercises", ar: "تمارين معدّلة للإصابات" },
  "sub.feature4": { en: "Progress tracking & streaks", ar: "تتبع التقدم والسلاسل" },
  "sub.subscribe": { en: "Subscribe Now", ar: "اشترك الآن" },

  // Contact
  "contact.whatsapp_desc": { en: "Chat with us directly", ar: "تواصل معنا مباشرة" },
  "contact.email": { en: "Email", ar: "البريد الإلكتروني" },
  "contact.subtitle": { en: "We're here to help", ar: "نحن هنا للمساعدة" },

  // Sports
  "sports.title1": { en: "What sports", ar: "وش الرياضات اللي" },
  "sports.title2": { en: "do you play?", ar: "تلعبها؟" },
  "sports.hint": { en: "Select all that apply to your typical week", ar: "اختر كل ما ينطبق على أسبوعك" },
  "sport.football": { en: "Football", ar: "كرة القدم" },
  "sport.padel": { en: "Padel", ar: "بادل" },
  "sport.pilates": { en: "Pilates", ar: "بيلاتس" },
  "sport.yoga": { en: "Yoga", ar: "يوغا" },
  "sport.tennis": { en: "Tennis", ar: "تنس" },
  "sport.running": { en: "Running", ar: "جري" },
  "sport.hiking": { en: "Hiking", ar: "مشي جبلي" },
  "sport.mma": { en: "MMA", ar: "فنون قتالية" },
  "sport.boxing": { en: "Boxing", ar: "ملاكمة" },
  "sport.swimming": { en: "Swimming", ar: "سباحة" },
  "sport.cycling": { en: "Cycling", ar: "دراجة" },
  "sport.basketball": { en: "Basketball", ar: "كرة سلة" },

  // Focus
  "focus.title": { en: "What should we prioritize?", ar: "حدد تركيزك" },
  "focus.weight_lifting": { en: "Weight Lifting", ar: "رفع الأثقال" },
  "focus.not_priority": { en: "Not a priority", ar: "ليس أولوية" },
  "focus.top_priority": { en: "Top priority", ar: "أولوية قصوى" },

  // Activities
  "activities.title": { en: "What does your week look like?", ar: "كيف يبدو أسبوعك؟" },
  "activities.add": { en: "Add Activity", ar: "أضف نشاط" },
  "activities.select_sport": { en: "Select Sport", ar: "اختر الرياضة" },
  "activities.select_duration": { en: "Duration (min)", ar: "المدة (دقيقة)" },
  "activities.select_intensity": { en: "Intensity", ar: "الشدّة" },
  "activities.easy": { en: "Easy", ar: "سهل" },
  "activities.moderate": { en: "Moderate", ar: "متوسط" },
  "activities.hard": { en: "Hard", ar: "قوي" },
  "activities.add_confirm": { en: "Add", ar: "أضف" },

  "day.monday": { en: "Monday", ar: "الإثنين" },
  "day.tuesday": { en: "Tuesday", ar: "الثلاثاء" },
  "day.wednesday": { en: "Wednesday", ar: "الأربعاء" },
  "day.thursday": { en: "Thursday", ar: "الخميس" },
  "day.friday": { en: "Friday", ar: "الجمعة" },
  "day.saturday": { en: "Saturday", ar: "السبت" },
  "day.sunday": { en: "Sunday", ar: "الأحد" },
  "day.mon": { en: "Mon", ar: "إثن" },
  "day.tue": { en: "Tue", ar: "ثلا" },
  "day.wed": { en: "Wed", ar: "أرب" },
  "day.thu": { en: "Thu", ar: "خمي" },
  "day.fri": { en: "Fri", ar: "جمع" },
  "day.sat": { en: "Sat", ar: "سبت" },
  "day.sun": { en: "Sun", ar: "أحد" },
  "day.M": { en: "M", ar: "ن" },
  "day.T": { en: "T", ar: "ث" },
  "day.W": { en: "W", ar: "ر" },
  "day.Th": { en: "T", ar: "خ" },
  "day.F": { en: "F", ar: "ج" },
  "day.S": { en: "S", ar: "س" },
  "day.Su": { en: "S", ar: "ح" },

  // Equipment
  "equipment.title": { en: "What equipment do you have?", ar: "ما المعدّات المتوفرة لديك؟" },
  "equipment.select_all": { en: "Select All", ar: "اختر الكل" },
  "equipment.free_weights": { en: "Free Weights", ar: "أوزان حرة" },
  "equipment.machines": { en: "Machines", ar: "أجهزة" },
  "equipment.benches": { en: "Benches", ar: "مقاعد" },
  "equipment.accessories": { en: "Accessories", ar: "إكسسوارات" },
  "equipment.minimal": { en: "Minimal Setup", ar: "أدنى تجهيز" },
  "equip.dumbbells": { en: "Dumbbells", ar: "دمبلز" },
  "equip.barbell": { en: "Barbell", ar: "بار حديد" },
  "equip.kettlebells": { en: "Kettlebells", ar: "كيتل بيل" },
  "equip.cable": { en: "Cable Machines", ar: "أجهزة كابل" },
  "equip.weight_machines": { en: "Weight Machines", ar: "أجهزة أوزان" },
  "equip.adj_bench": { en: "Adjustable Bench (Incline / Decline)", ar: "مقعد قابل للتعديل (مائل / منحدر)" },
  "equip.flat_bench": { en: "Flat Bench", ar: "مقعد مسطح" },
  "equip.resistance_bands": { en: "Resistance Bands", ar: "أشرطة مقاومة" },
  "equip.bodyweight": { en: "Bodyweight Only", ar: "وزن الجسم فقط" },

  // Injuries
  "injuries.title": { en: "Any injuries or pain?", ar: "هل لديك أي إصابات أو ألم؟" },
  "injuries.none": { en: "No injuries or pain", ar: "لا إصابات أو ألم" },
  "injuries.lower_body": { en: "Lower Body", ar: "الجزء السفلي" },
  "injuries.back_neck": { en: "Back & Neck", ar: "الظهر والرقبة" },
  "injuries.upper_body": { en: "Upper Body", ar: "الجزء العلوي" },
  "injury.knee": { en: "Knee", ar: "الركبة" },
  "injury.ankle": { en: "Ankle / ankle sprain", ar: "الكاحل / التواء" },
  "injury.foot": { en: "Foot", ar: "القدم" },
  "injury.heel": { en: "Heel", ar: "الكعب" },
  "injury.hip": { en: "Hip", ar: "الورك" },
  "injury.groin": { en: "Groin", ar: "الفخذ الداخلي" },
  "injury.hamstring": { en: "Hamstring", ar: "العضلة الخلفية" },
  "injury.quad": { en: "Quad", ar: "العضلة الأمامية" },
  "injury.calf": { en: "Calf", ar: "بطة الساق" },
  "injury.achilles": { en: "Achilles", ar: "وتر أخيل" },
  "injury.lower_back": { en: "Lower back", ar: "أسفل الظهر" },
  "injury.upper_back": { en: "Upper back", ar: "أعلى الظهر" },
  "injury.neck": { en: "Neck", ar: "الرقبة" },
  "injury.shoulder": { en: "Shoulder", ar: "الكتف" },
  "injury.elbow": { en: "Elbow", ar: "المرفق" },
  "injury.wrist": { en: "Wrist", ar: "الرسغ" },

  // Severity
  "severity.title": { en: "How severe?", ar: "ما مدى الشدّة؟" },
  "severity.hint": { en: "This helps us adjust exercise selection", ar: "هذا يساعدنا في اختيار التمارين المناسبة" },
  "severity.mild": { en: "Mild", ar: "خفيف" },
  "severity.moderate": { en: "Moderate", ar: "متوسط" },
  "severity.noticeable": { en: "Noticeable", ar: "ملحوظ" },
  "severity.severe": { en: "Severe", ar: "شديد" },
  "severity.no_pain": { en: "No pain", ar: "بدون ألم" },

  // Training Level
  "level.title": { en: "What's your training level?", ar: "ما مستواك في التدريب؟" },
  "level.beginner": { en: "Beginner", ar: "مبتدئ" },
  "level.beginner_desc": { en: "New to lifting or less than 6 months", ar: "جديد في رفع الأثقال أو أقل من 6 أشهر" },
  "level.intermediate": { en: "Intermediate", ar: "متوسط" },
  "level.intermediate_desc": { en: "1–3 years of consistent training", ar: "١-٣ سنوات من التدريب المنتظم" },
  "level.advanced": { en: "Advanced", ar: "متقدم" },
  "level.advanced_desc": { en: "3+ years, strong foundation", ar: "+٣ سنوات، أساس قوي" },

  // Goal
  "goal.title": { en: "What's your main goal?", ar: "ما هدفك الأساسي؟" },
  "goal.strength": { en: "Build Strength", ar: "بناء القوة" },
  "goal.strength_desc": { en: "Get stronger with progressive overload", ar: "ازدد قوة مع التحميل التدريجي" },
  "goal.muscle": { en: "Build Muscle", ar: "بناء العضلات" },
  "goal.muscle_desc": { en: "Hypertrophy-focused training", ar: "تدريب يركّز على تضخيم العضلات" },
  "goal.cut_build": { en: "Cut Fat, Build Muscle", ar: "حرق الدهون وبناء العضلات" },
  "goal.cut_build_desc": { en: "Lean out while building strength", ar: "انحف مع بناء القوة" },
  "goal.general": { en: "General Fitness", ar: "لياقة عامة" },
  "goal.general_desc": { en: "Stay fit and balanced", ar: "حافظ على لياقتك وتوازنك" },

  // Lifting Days
  "lifting.title": { en: "Which days do you want to lift?", ar: "أي أيام تريد التمرين؟" },
  "lifting.day": { en: "Lifting day", ar: "يوم تمرين" },
  "lifting.generate": { en: "Generate My Plan", ar: "أنشئ خطتي" },
  "lifting.sport_day": { en: "Sport day", ar: "يوم رياضة" },

  // Generating
  "gen.step1": { en: "Analyzing your schedule", ar: "نحلّل جدولك" },
  "gen.step2": { en: "Balancing sport load", ar: "نوازن الأحمال الرياضية" },
  "gen.step3": { en: "Selecting exercises", ar: "نختار التمارين" },
  "gen.step4": { en: "Optimizing recovery windows", ar: "نحسّن فترات التعافي" },
  "gen.step5": { en: "Building your plan", ar: "نبني خطتك" },
  "gen.personalizing": { en: "Personalizing your experience", ar: "نخصّص تجربتك" },

  // Dashboard
  "dash.today": { en: "Today", ar: "اليوم" },
  "dash.greeting": { en: "Hey {name}", ar: "هلا {name}" },
  "dash.default_name": { en: "there", ar: "فيك" },
  "dash.weekly_progress": { en: "Weekly Progress", ar: "التقدم الأسبوعي" },
  "dash.days_count": { en: "{x}/{y} days", ar: "{x}/{y} أيام" },
  "dash.exercises_done": { en: "{x}/{y} exercises done", ar: "{x}/{y} تمرين مكتمل" },
  "dash.upper_body": { en: "Upper Body", ar: "الجزء العلوي" },
  "dash.push_pull": { en: "Push + Pull", ar: "دفع + سحب" },
  "dash.min": { en: "~{n} min", ar: "~{n} دقيقة" },
  "dash.exercises": { en: "{n} exercises", ar: "{n} تمارين" },
  "dash.adaptation": { en: "Adjusted for Saturday's tennis session — reduced shoulder volume today", ar: "تم تعديل الخطة بناءً على جلسة التنس يوم السبت — تقليل حجم تمارين الكتف اليوم" },
  "dash.sets": { en: "Sets", ar: "مجموعات" },
  "dash.reps": { en: "Reps", ar: "تكرارات" },
  "dash.rest": { en: "Rest", ar: "راحة" },
  "dash.start_workout": { en: "Start Workout", ar: "ابدأ التمرين" },
  "dash.workout_complete": { en: "Workout Complete", ar: "التمرين مكتمل" },
  "dash.replace": { en: "Replace", ar: "استبدال" },
  "dash.same_movement": { en: "Same movement — {cat}", ar: "نفس الحركة — {cat}" },

  // Plan
  "plan.week": { en: "Week {x} of {y}", ar: "الأسبوع {x} من {y}" },
  "plan.your_plan": { en: "Your Plan", ar: "خطتك" },
  "plan.edit": { en: "Edit Plan", ar: "تعديل الخطة" },
  "plan.goal": { en: "Goal", ar: "الهدف" },
  "plan.level": { en: "Level", ar: "المستوى" },
  "plan.active": { en: "Active", ar: "نشط" },
  "plan.est_volume": { en: "Est. Weekly Volume", ar: "الحجم الأسبوعي المقدّر" },
  "plan.avg_session": { en: "Avg Session", ar: "متوسط الجلسة" },
  "plan.shoulder_adapted": { en: "Shoulder-adapted — reduced overhead pressing volume", ar: "معدّل للكتف — تقليل حجم تمارين الضغط العلوي" },
  "plan.lifting_calendar": { en: "Lifting Days", ar: "أيام التمرين" },

  // Edit Plan
  "edit.title": { en: "Edit Your Plan", ar: "عدّل خطتك" },
  "edit.desc": { en: "Adjust your preferences and we'll rebuild your plan.", ar: "عدّل تفضيلاتك وسنعيد بناء خطتك." },
  "edit.regenerate": { en: "Regenerate Plan", ar: "أعد بناء الخطة" },
  "edit.sports": { en: "Sports", ar: "الرياضات" },
  "edit.focus": { en: "Focus", ar: "التركيز" },
  "edit.injuries": { en: "Injuries", ar: "الإصابات" },
  "edit.lifting_days": { en: "Lifting Days", ar: "أيام التمرين" },
  "edit.activities": { en: "Weekly Activities", ar: "الأنشطة الأسبوعية" },

  // Exercise Detail
  "exercise.watch": { en: "Watch Demo", ar: "شاهد العرض" },
  "exercise.set_log": { en: "Set Log", ar: "سجل المجموعات" },
  "exercise.weight_kg": { en: "Weight (kg)", ar: "الوزن (كغ)" },
  "exercise.done": { en: "Done", ar: "تم" },
  "exercise.instructions": { en: "Instructions", ar: "التعليمات" },
  "exercise.finish": { en: "Finish Exercise", ar: "إنهاء التمرين" },
  "exercise.sets_completed": { en: "{x}/{y} Sets Completed", ar: "{x}/{y} مجموعات مكتملة" },
  "exercise.rpe": { en: "Rate of Perceived Exertion", ar: "مقياس الجهد المبذول" },
  "exercise.rpe_hint": { en: "How hard did this feel? (1 = easy, 10 = max effort)", ar: "ما مدى صعوبة هذا التمرين؟ (١ = سهل، ١٠ = أقصى جهد)" },
  "exercise.easy": { en: "Easy", ar: "سهل" },
  "exercise.max_effort": { en: "Max Effort", ar: "أقصى جهد" },
  "exercise.pain_q": { en: "Was there any pain?", ar: "هل شعرت بأي ألم؟" },
  "exercise.pain_hint": { en: "Not soreness — sharp, unusual, or joint pain", ar: "ليس التعب العادي — ألم حاد أو غير معتاد" },
  "exercise.no_pain": { en: "No Pain", ar: "لا ألم" },
  "exercise.yes": { en: "Yes", ar: "نعم" },
  "exercise.where_pain": { en: "Where was the pain?", ar: "أين كان الألم؟" },
  "exercise.select_location": { en: "Select location", ar: "اختر الموقع" },
  "exercise.pain_severity": { en: "Pain severity", ar: "شدة الألم" },
  "exercise.submit_finish": { en: "Submit & Finish", ar: "إرسال وإنهاء" },
  "exercise.skip_rest": { en: "Skip", ar: "تخطي" },

  // Active Workout
  "workout.title": { en: "Today's Workout", ar: "تمرين اليوم" },
  "workout.upper_body": { en: "Upper Body", ar: "الجزء العلوي" },
  "workout.rest_label": { en: "rest", ar: "راحة" },

  // Pain locations
  "pain.shoulder": { en: "Shoulder", ar: "الكتف" },
  "pain.elbow": { en: "Elbow", ar: "المرفق" },
  "pain.wrist": { en: "Wrist", ar: "الرسغ" },
  "pain.lower_back": { en: "Lower Back", ar: "أسفل الظهر" },
  "pain.upper_back": { en: "Upper Back", ar: "أعلى الظهر" },
  "pain.neck": { en: "Neck", ar: "الرقبة" },
  "pain.knee": { en: "Knee", ar: "الركبة" },
  "pain.hip": { en: "Hip", ar: "الورك" },
  "pain.chest": { en: "Chest", ar: "الصدر" },
  "pain.other": { en: "Other", ar: "أخرى" },

  // Intensity
  "intensity.moderate": { en: "Moderate", ar: "متوسط" },
  "intensity.hard": { en: "Hard", ar: "عالي" },
  "intensity.easy": { en: "Easy", ar: "سهل" },

  // Plan screen types
  "type.lifting": { en: "lifting", ar: "تمرين" },
  "type.sport": { en: "sport", ar: "رياضة" },
  "type.rest": { en: "rest", ar: "راحة" },
  "plan.recovery": { en: "Recovery", ar: "تعافي" },
  "plan.active_rest": { en: "Active rest day", ar: "يوم راحة نشطة" },
  "plan.lower_body": { en: "Lower Body", ar: "الجزء السفلي" },
  "plan.squat_hinge": { en: "Squat + Hinge", ar: "سكوات + رفع ميت" },
  "plan.full_body": { en: "Full Body", ar: "الجسم كامل" },
  "plan.compound": { en: "Compound focus", ar: "تركيز على التمارين المركبة" },
  "plan.full_rest": { en: "Full Rest", ar: "راحة كاملة" },
  "plan.recovery_mobility": { en: "Recovery & mobility", ar: "تعافي ومرونة" },
  "plan.moderate_intensity": { en: "Moderate intensity", ar: "شدة متوسطة" },

  // Instruction steps
  "instr.1": { en: "Set the cables at chest height with handles attached.", ar: "اضبط الكابلات على مستوى الصدر مع تثبيت المقابض." },
  "instr.2": { en: "Grab both handles and bring them together in front of your chest.", ar: "أمسك بكلا المقبضين واجمعهما أمام صدرك." },
  "instr.3": { en: "Press the handles forward and inward, squeezing your chest at peak contraction.", ar: "ادفع المقابض للأمام وللداخل مع شد عضلات الصدر عند أقصى انقباض." },
  "instr.4": { en: "Slowly return to starting position with control.", ar: "عُد ببطء إلى وضع البداية بتحكم." },

  // Duration
  "duration.min": { en: "{n} min", ar: "{n} دقيقة" },

  // Share Card
  "share.streak_points": { en: "Streak Points", ar: "نقاط السلسلة" },
  "share.workouts": { en: "{n} workouts", ar: "{n} تمرين" },
  "share.trained_this_week": { en: "trained this week", ar: "تدرّب هذا الأسبوع" },
  "share.affirmation": { en: "{name} has been too consistent lately", ar: "{name} كان ملتزمًا بشكل لافت مؤخرًا" },
  "share.brand": { en: "Metafi", ar: "تطبيق متعافي" },
};

const LanguageContext = createContext<LanguageContextType>({
  language: "ar",
  setLanguage: () => {},
  t: (key: string) => key,
  isRTL: true,
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("ar");

  useEffect(() => {
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string, replacements?: Record<string, string | number>) => {
    let text = translations[key]?.[language] || key;
    if (replacements) {
      Object.entries(replacements).forEach(([k, v]) => {
        text = text.replace(`{${k}}`, String(v));
      });
    }
    return text;
  };

  const isRTL = language === "ar";

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
