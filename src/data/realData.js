<<<<<<< HEAD
  export const realDashboards = [{
    id: "dash-001",
    title: "",
    description: "",
    owner: "",
    ownerAbbr: "",
    category:"",
    tags: ["", ""],
    dataSource: "",
    updateFrequency: "",
    createdAt: "2024-06-15T14:20:00Z",
    updatedAt: "2025-03-22T09:15:00Z",
    contactName: "",
    contactEmail: "",
    contactPhone: "(202) 555-4321",
    dashboardType: "Tableau",
    accessLevel: "Public",
    dashboardUrl: "https://example.com/dashboard/safety-metrics",
    thumbnailUrl: "/media/coming_soon.png",
    imageUrl: "/media/coming_soon.png",
    isVideo: false,
    views: 0,
    isFeatured: false, 
    isRestricted: ""
  },
  {
    id: "dash-001",
=======
// src/data/realData.js - Real dashboard data for production use
// This file is excluded from git and contains actual FAA dashboard information
// Schema matches sampleData.js for compatibility

export const realDashboards = [
  {
    id: "real-001",
    title: "Reauthorization Dashboard",
    description: "The Reauthorization Dashboard displays FAA's progress in meeting the requirements of the FAA Reauthorization Act of 2018.  It includes the completion status of the more than 300 FAA-led deliverables.",
    owner: "Aviation Safety",
    ownerAbbr: "AVS",
    tags: ["AVS", "Aviation Safety", "Reauthorization"],
    dataSource: "",
    updateFrequency: "",
    createdAt: "",
    updatedAt: "2021-06-03T16:20:00Z",
    contactName: "Deer, Michael (FAA)",
    contactEmail: "",
    contactPhone: "",
    dashboardType: "Tableau",
    accessLevel: "",
    dashboardUrl: "https://tableau.faa.gov/#/site/_APL/workbooks/24822",
    thumbnailUrl: "/media/coming_soon.png",
    imageUrl: "/media/coming_soon.png",
    isVideo: false,
    views: 565,
    isFeatured: true, 
    isRestricted: false
  },
  {
    id: "real-002",
    title: "Legislative Requirements Dashboard",
    description: "Tracking FAA's legislative requirements",
    owner: "",
    ownerAbbr: "",
    tags: [],
    dataSource: "",
    updateFrequency: "",
    createdAt: "",
    updatedAt: "3/27/2024",
    contactName: "McCann, Nathan (FAA)",
    contactEmail: "",
    contactPhone: "",
    dashboardType: "Tableau",
    accessLevel: "",
    dashboardUrl: "https://tableau.faa.gov/#/site/_APL/workbooks/38535",
    thumbnailUrl: "",
    imageUrl: "",
    isVideo: false,
    views: 245,
    isFeatured: false, 
    isRestricted: false
  },
  {
    id: "real-003",
>>>>>>> 6ccb58903ad4d6b7ecccd4a6ae002c197a439b15
    title: "",
    description: "",
    owner: "",
    ownerAbbr: "",
<<<<<<< HEAD
    category:"",
    tags: ["", ""],
    dataSource: "",
    updateFrequency: "",
    createdAt: "2024-06-15T14:20:00Z",
    updatedAt: "2025-03-22T09:15:00Z",
    contactName: "",
    contactEmail: "",
    contactPhone: "(202) 555-4321",
    dashboardType: "Tableau",
    accessLevel: "Public",
    dashboardUrl: "",
    thumbnailUrl: "/media/coming_soon.png",
    imageUrl: "/media/coming_soon.png",
=======
    tags: [],
    dataSource: "",
    updateFrequency: "",
    createdAt: "",
    updatedAt: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    dashboardType: "",
    accessLevel: "",
    dashboardUrl: "",
    thumbnailUrl: "",
    imageUrl: "",
>>>>>>> 6ccb58903ad4d6b7ecccd4a6ae002c197a439b15
    isVideo: false,
    views: 0,
    isFeatured: false
  },
  {
<<<<<<< HEAD
    id: "dash-001",
=======
    id: "real-004",
>>>>>>> 6ccb58903ad4d6b7ecccd4a6ae002c197a439b15
    title: "",
    description: "",
    owner: "",
    ownerAbbr: "",
<<<<<<< HEAD
    category:"",
    tags: ["", ""],
    dataSource: "",
    updateFrequency: "",
    createdAt: "2024-06-15T14:20:00Z",
    updatedAt: "2025-03-22T09:15:00Z",
    contactName: "",
    contactEmail: "",
    contactPhone: "(202) 555-4321",
    dashboardType: "Tableau",
    accessLevel: "Public",
    dashboardUrl: "",
    thumbnailUrl: "/media/coming_soon.png",
    imageUrl: "/media/coming_soon.png",
=======
    tags: [],
    dataSource: "",
    updateFrequency: "",
    createdAt: "",
    updatedAt: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    dashboardType: "",
    accessLevel: "",
    dashboardUrl: "",
    thumbnailUrl: "",
    imageUrl: "",
    isVideo: false,
    views: 0,
    isFeatured: false
  },
  {
    id: "real-005",
    title: "",
    description: "",
    owner: "",
    ownerAbbr: "",
    tags: [],
    dataSource: "",
    updateFrequency: "",
    createdAt: "",
    updatedAt: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    dashboardType: "",
    accessLevel: "",
    dashboardUrl: "",
    thumbnailUrl: "",
    imageUrl: "",
>>>>>>> 6ccb58903ad4d6b7ecccd4a6ae002c197a439b15
    isVideo: false,
    views: 0,
    isFeatured: false
  }
<<<<<<< HEAD
]
=======
  // Add more dashboard entries as needed
  // Copy this template and increment the ID number
];

/*
SCHEMA REFERENCE (from sampleData.js):
{
  id: string (unique identifier)
  title: string (dashboard title)
  description: string (detailed description)
  owner: string (full organization name)
  ownerAbbr: string (organization abbreviation)
  tags: array of strings (searchable categories)
  dataSource: string (primary data source)
  updateFrequency: string (how often updated)
  createdAt: string (ISO date string)
  updatedAt: string (ISO date string)
  contactName: string (contact person)
  contactEmail: string (contact email)
  contactPhone: string (contact phone)
  dashboardType: string (technology used)
  accessLevel: string (Public/Restricted/etc)
  dashboardUrl: string (link to dashboard)
  thumbnailUrl: string (path to thumbnail image)
  imageUrl: string (path to full image)
  isVideo: boolean (true if media is video)
  views: number (view count)
  isFeatured: boolean (featured on homepage), 
  isRestricted: boolean (restricted or open)
}
*/
>>>>>>> 6ccb58903ad4d6b7ecccd4a6ae002c197a439b15
