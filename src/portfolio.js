/* Change this file to get your personal Porfolio */

// Website related settings
const settings = {
  isSplash: true, // Change this to false if you don't want Splash screen.
};

//Home Page
const greeting = {
  foot: "Ogooluwani Adewale",
  title: "Ogooluwani Adewale",
  logo_name: "Ogooluwani Adewale",
  nickname: "robot",
  subTitle:
  "A passionate, ambitious, highly organized and result-oriented individual who always thrive to work on end to end products which develop sustainable and scalable social and technical systems to create impact.",
    
  resumeLink:
    "https://drive.google.com/file/d/1QhY5pNVooWx1TZEnrs_jvR7oQVqdJd9U/view?usp=sharing",
  portfolio_repository: "https://github.com/O-Robot",
};

const socialMediaLinks = [
  /* Your Social Media Link */
  // github: "https://github.com/O-Robot",
  // linkedin: "https://linkedin.com/in/adewale-ogooluwani",
  // gmail: "adewaleogooluwani@gmail.com",
  // gitlab: "https://github.com/O-Robot",
  // facebook: "https://web.facebook.com/ogzy.robot/",
  // twitter: "https://twitter.com/ogzy_robot",
  // instagram: "https://www.instagram.com/ogzy_robot/"

  {
    name: "Github",
    link: "https://github.com/O-Robot",
    fontAwesomeIcon: "fa-github", // Reference https://fontawesome.com/icons/github?style=brands
    backgroundColor: "#181717", // Reference https://simpleicons.org/?q=github
  },
  {
    name: "LinkedIn",
    link: "https://linkedin.com/in/adewale-ogooluwani",
    fontAwesomeIcon: "fa-linkedin-in", // Reference https://fontawesome.com/icons/linkedin-in?style=brands
    backgroundColor: "#0077B5", // Reference https://simpleicons.org/?q=linkedin
  },
  // {
  //   name: "YouTube",
  //   link: "https://www.youtube.com/channel/UC_amoXmmxSY9KusoDczDTXQ",
  //   fontAwesomeIcon: "fa-youtube", // Reference https://fontawesome.com/icons/youtube?style=brands
  //   backgroundColor: "#FF0000", // Reference https://simpleicons.org/?q=youtube
  // },
  {
    name: "Gmail",
    link: "mailto:adewaleogooluwani@gmail.com",
    fontAwesomeIcon: "fa-google", // Reference https://fontawesome.com/icons/google?style=brands
    backgroundColor: "#D14836", // Reference https://simpleicons.org/?q=gmail
  },
  {
    name: "Twitter",
    link: "https://twitter.com/ogzy_robot",
    fontAwesomeIcon: "fa-twitter", // Reference https://fontawesome.com/icons/twitter?style=brands
    backgroundColor: "#1DA1F2", // Reference https://simpleicons.org/?q=twitter
  },
  {
    name: "Facebook",
    link: "https://www.facebook.com/ogzy.robot/",
    fontAwesomeIcon: "fa-facebook-f", // Reference https://fontawesome.com/icons/facebook-f?style=brands
    backgroundColor: "#1877F2", // Reference https://simpleicons.org/?q=facebook
  },
  {
    name: "Instagram",
    link: "https://www.instagram.com/ogzy_robot/",
    fontAwesomeIcon: "fa-instagram", // Reference https://fontawesome.com/icons/instagram?style=brands
    backgroundColor: "#E4405F", // Reference https://simpleicons.org/?q=instagram
  },
  {
    name: "Behance",
    link: "https://www.behance.net/ogooluwaniadewale",
    fontAwesomeIcon: "fa-behance", // Reference https://fontawesome.com/icons/instagram?style=brands
    backgroundColor: "#053eff ", // Reference https://simpleicons.org/?q=instagram
  },
];

const skills = {
  data: [
    {
      title: "Front-End Web Development",
      fileName: "FullStackImg",
      skills: [
        "⚡ Conceptualize creative ideas",
        "⚡ Prepare design plans and present website structure",
        "⚡ Execute current design trends and techniques in web applications",
        "⚡ Design responsive landing pages",
        "⚡ Create website designs using HTML, CSS, Javascript, Wordpress etc",
        "⚡ Build responsive website Front-End using React",
      ],
      softwareSkills: [
        {
          skillName: "HTML5",
          fontAwesomeClassname: "simple-icons:html5",
          style: {
            color: "#E34F26",
          },
        },
        {
          skillName: "CSS3",
          fontAwesomeClassname: "fa-css3",
          style: {
            color: "#1572B6",
          },
        },
        {
          skillName: "Sass",
          fontAwesomeClassname: "simple-icons:sass",
          style: {
            color: "#CC6699",
          },
        },
        {
          skillName: "JavaScript",
          fontAwesomeClassname: "simple-icons:javascript",
          style: {
            backgroundColor: "#000000",
            color: "#F7DF1E",
          },
        },
        {
          skillName: "ReactJS",
          fontAwesomeClassname: "simple-icons:react",
          style: {
            color: "#61DAFB",
          },
        },
        {
          skillName: "Wordpress",
          fontAwesomeClassname: "fa-wordpress",
          style: {
            color: "#21759B",
          },
        },
      ],
    },
    {
      title: "UI/UX Design",
      fileName: "DesignImg",
      skills: [
        "⚡ Develop and conceptualize comprehensive UI/UX design strategy",
        "⚡ Design UI elements and tools such as navigation menus, search boxes, tabs, and widgets",
        "⚡ Combine creativity with an awareness of design elements",
        "⚡ Illustrate design ideas using storyboards, process flows and sitemaps",
        "⚡ Translate concepts into user flows, wireframes, mockups and prototypes that lead to intuitive user experiences",
      ],
      softwareSkills: [
        {
          skillName: "Adobe XD",
          fontAwesomeClassname: "logos:adobe-xd",
          style: {
            // backgroundColor: "#450034",
            // borderRadius: "10px",
            color: "#FF2BC2",
          },
        },
        {
          skillName: "Figma",
          fontAwesomeClassname: "logos-figma",
          style: {
            color: "#F24E1E",
          },
        },
        {
          skillName: "Adobe Illustrator",
          fontAwesomeClassname: "vscode-icons:file-type-ai",
          style: {
            color: "#FF7C00",
          },
        },
      ],
    },
    {
      title: "Graphics Design and Branding",
      fileName: "Graphics",
      skills: [
        "⚡ Plan concepts by studying relevant information and materials",
        "⚡ Develop design based on clients requirements",
        "⚡ Create wide range of graphics and layouts for products illustration, company logos, and websites",
        "⚡ Change and controllcolours, shadows, text, light, etc to create life-like designs",
        "⚡ Simplify abstract concepts and complex ideas into visually stunning and playful designs",
      ],
      softwareSkills: [
        {
          skillName: "Corel Draw",
          fontAwesomeClassname: "file-icons:coreldraw-alt",
          style: {
            backgroundColor: "transparent",
            color: "#084d41",
          },
        },
        {
          skillName: "Photoshop",
          fontAwesomeClassname: "vscode-icons:file-type-photoshop2",
          style: {
            backgroundColor: "transparent",
          },
        },
        {
          skillName: "Adobe Illustrator",
          fontAwesomeClassname: "vscode-icons:file-type-ai2",
          style: {
            backgroundColor: "transparent",
          },
        },
        {
          skillName: "Canva",
          fontAwesomeClassname: "simple-icons:canva",
          style: {
            backgroundColor: "transparent",
            color: "#20C4CB",
          },
        },
      ],
    },
    {
      title: "Motion Graphics and Animation",
      fileName: "CloudInfraImg",
      skills: [
        "⚡ Design and create enticing motion graphics for video deliverables (corporate videos, e-learning, websites, marketing demos, etc)",
        "⚡ Develop video and animation that portrays motion",
        "⚡ Edit raw video footage and add effects or elements to enhance motion graphics",
        "⚡ Research and analyze best design techniques and solutions to create motion graphics",
      ],
      softwareSkills: [
        {
          skillName: "Adobe After Effects",
          fontAwesomeClassname: "cib-adobe-after-effects",
          style: {
            color: "purple",
          },
        },
        {
          skillName: "Adobe Premiere Pro",
          fontAwesomeClassname: "cib-adobe-premiere",
          style: {
            backgroundColor: "#180024",
            color: "#e788fe",
          },
        },
        {
          skillName: "Adobe Animate",
          fontAwesomeClassname: "file-icons:adobe-animate",
          style: {
            color: "#00005b",
          },
        },
        {
          skillName: "Cyberlink PowerDirector",
          fontAwesomeClassname: "bi-camera-video-fill",
          style: {
            color: "#00005b",
          },
        },
        {
          skillName: "Blender",
          fontAwesomeClassname: "simple-icons:blender",
          style: {
            color: "#EA7600",
          },
        },
      ],
    },
    {
      title: "Data Entry and Analysis",
      fileName: "DataScienceImg",
      skills: [
        "⚡ Prepare and sort documents for data entry",
        "⚡ Resolve discrepancies in information and obtaining further information for incomplete documents",
        "⚡ Enter data into database software and checking to ensure the accuracy of the data that has been inputted",
        "⚡ Collect and interpret data",
        "⚡ Define new data collection and analysis processes",
        "⚡ Identify patterns and trends in data sets",
      ],
      softwareSkills: [
        {
          skillName: "Microsoft Word",
          fontAwesomeClassname: "vscode-icons:file-type-word",
          style: {
            backgroundColor: "transparent",
          },
        },
        {
          skillName: "Microsoft PowerPoint",
          fontAwesomeClassname: "vscode-icons:file-type-powerpoint",
          style: {
            backgroundColor: "transparent",
          },
        },
        {
          skillName: "Microsoft Excel",
          fontAwesomeClassname: "vscode-icons:file-type-excel",
          style: {
            backgroundColor: "transparent",
          },
        },
        // {
        //   skillName: "ACL Analytics",
        //   fontAwesomeClassname: "acl.svg",
        //   style: {
        //     backgroundColor: "transparent",
        //     color: "#20C4CB",
        //   },
        // },
      ],
    },
  ],
};

// Education Page
const competitiveSites = {
  competitiveSites: [
    {
      siteName: "Udemy",
      iconifyClassname: "simple-icons:udemy",
      style: {
        color: "#2EC866",
      },
      profileLink: "https://drive.google.com/file/d/1W9QkU0x26XUTHQb22hF2iiGITLu7sZ76/view",
    },
    // {
    //   siteName: "Facebook",
    //   iconifyClassname: "simple-icons:facebook",
    //   style: {
    //     color: "#5B4638",
    //   },
    //   profileLink: "https://drive.google.com/file/d/1W9QkU0x26XUTHQb22hF2iiGITLu7sZ76/view",
    // },
    {
      siteName: "Adobe",
      iconifyClassname: "simple-icons:adobe",
      style: {
        color: "#1F8ACB",
      },
      profileLink: "https://drive.google.com/file/d/1W9QkU0x26XUTHQb22hF2iiGITLu7sZ76/view",
    },
    // {
    //   siteName: "Google",
    //   iconifyClassname: "simple-icons:google",
    //   style: {
    //     color: "#323754",
    //   },
    //   profileLink: "https://drive.google.com/file/d/1W9QkU0x26XUTHQb22hF2iiGITLu7sZ76/view",
    // },
    {
      siteName: "Microsoft",
      iconifyClassname: "simple-icons:microsoft",
      style: {
        color: "#20BEFF",
      },
      profileLink: "https://drive.google.com/file/d/1W9QkU0x26XUTHQb22hF2iiGITLu7sZ76/view",
    },
  ],
};

const degrees = {
  degrees: [
    {
      title: "Obafemi Awolowo University, Osun Nigeria" ,
      subtitle: "Bachelor of Science - B.Sc, Economics",
      logo_path: "oau.png",
      alt_name: "OAU Logo",
      duration: "",
      descriptions: [
        "Activities and societies:",
        "⚡ Member, LQED Committee, Nigerian Economics Students' Association (NESAOAU)",
        "⚡ Technical Head, Nigerian Economics Students' Association (NESAOAU)",
        "⚡ Electoral Chairman, Nigerian Economics Students' Association (NESAOAU)",
      ],
      website_link: "http://oauife.edu.ng",
    },
  ],
};

const certifications = {
  certifications: [
    {
      title: "Microsoft Office",
      subtitle: "- Word Tutor",
      logo_path: "microsoft_logo.png",
      certificate_link:
        "https://drive.google.com/file/d/1W9QkU0x26XUTHQb22hF2iiGITLu7sZ76/view",
      alt_name: "NESA OAU",
      color_code: "orange",
    },
    {
      title: "SQL Injections",
      subtitle: "- Training",
      logo_path: "udemy.svg",
      certificate_link:
        "https://drive.google.com/file/d/1W9QkU0x26XUTHQb22hF2iiGITLu7sZ76/view",
      alt_name: "deeplearning.ai",
      color_code: "#d3d3d3",
    },
    // {
    //   title: "CEH",
    //   subtitle: "- In view",
    //   logo_path: "google_logo.png",
    //   certificate_link:
    //     "https://drive.google.com/file/d/1W9QkU0x26XUTHQb22hF2iiGITLu7sZ76/view",
    //   alt_name: "deeplearning.ai",
    //   color_code: "purple",
    // },
    {
      title: "React",
      subtitle: "- React Training",
      logo_path: "react.svg",
      certificate_link:
        "https://www.udemy.com/certificate/UC-f7e25e67-8151-4c8b-93eb-6fd924714cc1/",
      alt_name: "React",
      color_code: "black",
    },
  ],
};

// Experience Page
// I have worked with many evolving startups as ML and DL Developer, Designer and Software Architect. I have also worked with some well established companies mostly as AI Developer. I love organising events and that is why I am also involved with many opensource communities as a representative.
const experience = {
  title: "Experience",
  subtitle: "Work, Internship and Volunteership",
  description:
    "",
  header_image_path: "experience.svg",
  sections: [
    {
      title: "Work",
      experiences: [
        {
          title: "Junior Front End Web Developer",
          company: "Boxin Logistics",
          company_url: "https://boxin.ng",
          logo_path: "boxinLogo.png",
          duration: "May 2021 - PRESENT",
          location: "Lagos, Nigeria",
          // description:
          //   "⚡ Designed a web application for the company.",
          description2:
            "",
          color: "#0879bf",
        },
        {
          title: "Graphics and Motion Designer",
          company: "Boxin Logistics",
          company_url: "http://boxin.ng/",
          logo_path: "boxinLogo.png",
          duration: "December 2020 - PRESENT",
          location: "Lagos, Nigeria",
          // description:
          //   "⚡ Designed a web application for the company.",
          description2:
            "",
          color: "#0879bf",
        },
        {
          title: "Web Designer",
          company: "GI Career Services",
          company_url: "http://gicareerservices.com/",
          logo_path: "gics-logo.png",
          duration: "June 2020 - PRESENT",
          location: "Lagos, Nigeria",
          description:
            "⚡ Designed a web application for the company.",
          description2:
            "",
          color: "#0879bf",
        },
        {
          title: "Freelancer",
          company: "Mickey Graphix",
          company_url: "https://wa.me.2348024218309",
          logo_path: "logo.png",
          duration: "September 2016 - PRESENT",
          location: "Ikeja, Lagos, Nigeria",
          description:
            "⚡ I have worked on different projects from creating websites to graphics and motion design.",
          description2:
            "⚡ Completed multiple fixed and hourly projects with positive feedback.",
          color: "orange",
        },
      ],
    },
    {
      title: "Internships",
      experiences: [
        {
          title: "Web Design Tutor",
          company: "Audit and Systems Solutions",
          company_url: "https://www.solutionsaudit.com/",
          logo_path: "audit.png",
          duration: "September 2016 - April 2017",
          location: "Ikeja, Lagos, Nigeria",
          description:
            "⚡Mentored trainees expertly on Beginner and Intermediate levels of HTML, CSS, PHP, JavaScript, etc.",
          description2:
            "⚡Evaluated trainees on Beginner and Intermediate levels of HTML, CSS, PHP, JavaScript, etc.",
          color: "orange",
        },
        // {
        //   title: "Data Science Research Intern",
        //   company: "Delhivery Pvt. Ltd.",
        //   company_url: "https://www.delhivery.com/",
        //   logo_path: "delhivery_logo.png",
        //   duration: "May 2019 - Sept 2019",
        //   location: "Gurgaon, Haryana",
        //   description:
        //     "I have worked on project of predicting freight rates based on previous data. There were two objectives: (1) To build a forecasting engine to predict daily freight rates. (2) To embed feature in the model which can explain the seasonal major changes in freight rate based on regions and locations. I have closely worked with deep learning models in combination with statistical methods to create solution for this. At the end of internship, I had created model deployed on AWS EC2 with the use of Kafka stream jobs, ElasticSearch and PostgreSQL.",
        //   color: "#ee3c26",
        // },
        // {
        //   title: "Data Science Intern",
        //   company: "Intel Indexer LLC",
        //   company_url:
        //     "https://opencorporates.com/companies/us_dc/EXTUID_4170286",
        //   logo_path: "intel_logo.jpg",
        //   duration: "Nov 2018 - Dec 2018",
        //   location: "Work From Home",
        //   description:
        //     "This is financial Solution Company. I have made Supervised Learning model for the company which can perform time series analysis on Stock price data for 32 companies. I have built LSTM Neural Networks Model and trained the data of 32 companies for last 2 years. This model is also used for forecasting.",
        //   color: "#0071C5",
        // },
      ],
    },
    {
      title: "Volunteerships",
      experiences: [
        {
          title: "Technical Director",
          company: "The Nigerian Economics Students' Association",
          company_url: "",
          logo_path: "nesa.png",
          duration: "April 2019 - December 2019",
          location: "NESA OAU, Osun, Nigeria",
          description:
            "⚡Worked with other team heads and successfully raised over 1.5million for the execution of the success of the 7th edition of the Annual Economics Students' Conference(AESC) which had over 3000 people in attendance and over 20 schools represented",
          description2:
            "⚡Coordinated all Technical Activities for the Association throughout the academic session.",
          color: "#4285F4",
        },
        {
          title: "Microsoft Excel Tutor",
          company: "Leadership Qualities and Entrepreneurial Development - 17th Edition",
          company_url: "",
          logo_path: "excel.png",
          duration: "April 2019 - May 2019",
          location: "NESA OAU, Osun, Nigeria",
          description:
            "⚡Tutored Microsoft Excel for Beginner and Intermediate levels in the 17th Edition.",
          description2:
            "",
          color: "green",
        },
        {
          title: "Microsoft Word Tutor",
          company: "Leadership Qualities and Entrepreneurial Development - 16th Edition",
          company_url: "",
          logo_path: "word.png",
          duration: "April 2018 - May 2018",
          location: "NESA OAU, Osun, Nigeria",
          description:
            "⚡Tutored Microsoft Word for Beginner and Intermediate levels in the 16th Edition.",
          description2:
            "⚡Assessed trainees on Microsoft Word Beginner and Intermediate levels in the 16th Edition.",
          color: "#0082be",
        },
      ],
    },
  ],
};

// Experience Page
// I have worked with many evolving startups as ML and DL Developer, Designer and Software Architect. I have also worked with some well established companies mostly as AI Developer. I love organising events and that is why I am also involved with many opensource communities as a representative.
const skilled = {
  sections: [
    {
      title: "Interpersonal Skills",
      experiences: [
        {
          title: "Leadership",
        },
        {
          title: "Teamwork",
        },
        {
          title: "Training",
        },
        {
          title: "Critical Thinking",
        },
        {
          title: "Team Building",
        },
      ],
    },
  ],
};

// Projects Page
const projectsHeader = {
  title: "My Works",
  description: "My Works are made using a vast variety of latest technology tools. My best experience is conceptualization of comprehensive design strategies and deploying them to web applications",
  avatar_image_path: "projects_image.svg",
};

// Contact Page
const contactPageData = {
  contactSection: {
    title: "Contact Me",
    profile_image_path: "car-rob.png",
    description:
      "I am available on almost every social media. You can message me, I will reply within 24 hours. I can help you with Motion Designs, Graphics and Branding, Front End Development, UI/UX and Data Analysis",
  },
  blogSection: {
    title: "Send A Message",
    subtitle:
      "For individual fundamental empowerment, I like to write powerful lessons that create impact on each of the reader individually to change the core of their character.",
    link: "https://wa.me/2348024218309",
    avatar_image_path: "blogs_image.svg",
  },
  addressSection: {
    title: "Address",
    subtitle:
      "110B Awolowo Way, Ikeja, Lagos, Nigeria",
    avatar_image_path: "address_image.svg",
    location_map_link: "https://goo.gl/maps/YytpS5Pancj6gKst6",
  },
  phoneSection: {
    title: "Phone Number",
    subtitle: "+234 802 421 8309",
  },
};


export {
  settings,
  greeting,
  socialMediaLinks,
  skills,
  competitiveSites,
  degrees,
  certifications,
  experience,
  skilled,
  projectsHeader,
  contactPageData,
};
