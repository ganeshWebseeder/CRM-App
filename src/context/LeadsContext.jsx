import { createContext, useState, useContext } from "react";

// Create Context
const LeadsContext = createContext();

// Custom hook for easy access
export const useLeads = () => useContext(LeadsContext);

// Provider component
export const LeadsProvider = ({ children }) => {
    const [leads, setLeads] = useState([
    {
      id: 1,
      clientName: "Rahul Sharma",
      phone: "9876543210",
      mail: "rahul.sharma@example.com",
      status: "New",
      source: "Website",
      notes: "Interested in web development services.",
    },
    {
      id: 2,
      clientName: "Priya Verma",
      phone: "9823456789",
      mail: "priya.verma@example.com",
      status: "Follow Up",
      source: "LinkedIn",
      notes: "Requested a quote for CRM project.",
    },
    {
      id: 3,
      clientName: "Amit Patel",
      phone: "9898123456",
      mail: "amit.patel@example.com",
      status: "New",
      source: "Referral",
      notes: "Looking for e-commerce website design.",
    },
    {
      id: 4,
      clientName: "Sneha Iyer",
      phone: "9911223344",
      mail: "sneha.iyer@example.com",
      status: "Closed",
      source: "Email Campaign",
      notes: "Did not proceed due to budget constraints.",
    },
    {
      id: 5,
      clientName: "Vikram Singh",
      phone: "9811122233",
      mail: "vikram.singh@example.com",
      status: "Follow Up",
      source: "Google Ads",
      notes: "Interested in SEO optimization services.",
    },
    {
      id: 6,
      clientName: "Neha Gupta",
      phone: "9955443322",
      mail: "neha.gupta@example.com",
      status: "New",
      source: "Facebook",
      notes: "Requested mobile app development.",
    },
    {
      id: 7,
      clientName: "Ankit Mehta",
      phone: "9877001122",
      mail: "ankit.mehta@example.com",
      status: "New",
      source: "Cold Call",
      notes: "Wants consultation for automation tools.",
    },
    {
      id: 8,
      clientName: "Rohit Deshmukh",
      phone: "9844005566",
      mail: "rohit.deshmukh@example.com",
      status: "Closed",
      source: "Referral",
      notes: "Project completed successfully.",
    },
    {
      id: 9,
      clientName: "Kritika Nair",
      phone: "9866112200",
      mail: "kritika.nair@example.com",
      status: "Follow Up",
      source: "Website",
      notes: "Wants UI/UX redesign service.",
    },
    {
      id: 10,
      clientName: "Suresh Kumar",
      phone: "9900990099",
      mail: "suresh.kumar@example.com",
      status: "New",
      source: "Email",
      notes: "Interested in ERP integration.",
    },
    {
      id: 11,
      clientName: "Manish Chauhan",
      phone: "9811221100",
      mail: "manish.chauhan@example.com",
      status: "New",
      source: "LinkedIn",
      notes: "Needs logo and branding work.",
    },
    {
      id: 12,
      clientName: "Tina Dsouza",
      phone: "9798989898",
      mail: "tina.dsouza@example.com",
      status: "Closed",
      source: "Referral",
      notes: "Converted to client — website delivered.",
    },
    {
      id: 13,
      clientName: "Harsh Joshi",
      phone: "9822225566",
      mail: "harsh.joshi@example.com",
      status: "Follow Up",
      source: "Conference",
      notes: "Wants automation dashboard for sales.",
    },
    {
      id: 14,
      clientName: "Pooja Malhotra",
      phone: "9898111222",
      mail: "pooja.malhotra@example.com",
      status: "New",
      source: "Instagram",
      notes: "Interested in app promotion campaign.",
    },
    {
      id: 15,
      clientName: "Aditya More",
      phone: "9922445566",
      mail: "aditya.more@example.com",
      status: "New",
      source: "Cold Email",
      notes: "Requested quotation for portfolio site.",
    },
  ]);

  // Add Lead
  const addLead = (lead) => {
    setLeads((prev) => [...prev, { ...lead, id: Date.now() }]);
  };

  // Update Lead
  const updateLead = (id, updatedLead) => {
    setLeads((prev) => prev.map((l) => (l.id === id ? updatedLead : l)));
  };

  // Delete Lead
  const deleteLead = (id) => {
    setLeads((prev) => prev.filter((l) => l.id !== id));
  };

  return (
    <LeadsContext.Provider value={{ leads, addLead, updateLead, deleteLead }}>
      {children}
    </LeadsContext.Provider>
  );
};
