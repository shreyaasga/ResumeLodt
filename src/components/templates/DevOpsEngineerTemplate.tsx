import React from "react";
import { ResumeData } from "@/contexts/ResumeContext";

interface DevOpsEngineerTemplateProps {
  resumeData: ResumeData;
  scale?: number;
}

const DevOpsEngineerTemplate: React.FC<DevOpsEngineerTemplateProps> = ({
  resumeData,
  scale = 1,
}) => {
  const { personalInfo, education, experience, skills } = resumeData;

  return (
    <div
      className="bg-white text-black"
      style={{
        width: `${8.5 * scale}in`,
        height: `${11 * scale}in`,
        padding: `${0.5 * scale}in`,
        fontFamily: "Arial, sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Header Section */}
      <div className="mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-blue-700">{personalInfo.fullName}</h1>
            <h2 className="text-xl text-gray-700 mt-1">{personalInfo.title}</h2>
          </div>
          <div className="text-right">
            <div className="text-sm">{personalInfo.email}</div>
            <div className="text-sm">{personalInfo.phone}</div>
            <div className="text-sm">{personalInfo.address}</div>
            <div className="text-sm">github.com/{personalInfo.fullName.toLowerCase().replace(/\s+/g, '')}</div>
          </div>
        </div>
        
        {/* Summary */}
        <div className="mt-4">
          <p className="text-sm">
            DevOps engineer with 8+ years of experience in supporting and automating critical deployments over big infrastructure. 
            Proficient in Jenkins and AWS CodeDeploy. Led a team of 10, accelerating the release time by 25%.
          </p>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="flex gap-6">
        {/* Left Column - Work Experience */}
        <div className="w-2/3">
          <h2 className="text-xl font-bold text-blue-700 border-b border-gray-300 pb-1 mb-4">WORK EXPERIENCE</h2>
          
          {experience.map((exp, index) => (
            <div key={exp.id || index} className="mb-6">
              <div className="flex justify-between">
                <h3 className="font-bold">{exp.position}</h3>
                <span className="text-sm">{exp.startDate} - {exp.endDate || "Present"}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-semibold">{exp.company}</span>
                <span>{exp.location}</span>
              </div>
              <ul className="list-none mt-2 text-sm">
                {exp.description.split('\n').map((item, i) => (
                  <li key={i} className="flex items-start gap-2 mb-2">
                    <span className="text-blue-700">-</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          
          {/* Education Section */}
          <h2 className="text-xl font-bold text-blue-700 border-b border-gray-300 pb-1 mb-4 mt-6">EDUCATION</h2>
          <div className="mb-6">
            <h3 className="font-bold">
              {education[0]?.degree || "Master's in Computer Science"}
            </h3>
            <div className="text-sm">
              {education[0]?.institution || "University of California, Berkeley"}
            </div>
            <div className="text-xs text-gray-600">
              {education[0]?.startDate || "2012"} - {education[0]?.endDate || "2014"}
            </div>
          </div>
          
          {/* Languages Section */}
          <h2 className="text-xl font-bold text-blue-700 border-b border-gray-300 pb-1 mb-4">LANGUAGES</h2>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <div className="font-semibold">English</div>
              <div className="text-xs text-gray-600">Native or Bilingual Proficiency</div>
            </div>
            <div>
              <div className="font-semibold">Spanish</div>
              <div className="text-xs text-gray-600">Full Professional Proficiency</div>
            </div>
            <div>
              <div className="font-semibold">Italian</div>
              <div className="text-xs text-gray-600">Professional Working Proficiency</div>
            </div>
          </div>
        </div>
        
        {/* Right Column - Skills and Certifications */}
        <div className="w-1/3">
          <h2 className="text-xl font-bold text-blue-700 border-b border-gray-300 pb-1 mb-4">TECHNICAL SKILLS</h2>
          
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Systems Administration:</h3>
            <p className="text-sm mb-3">RedHat, Enterprise Linux, Ubuntu, CentOS, Fedora, LVM, Bash Shell, Ansible</p>
            
            <h3 className="font-semibold mb-2">Cloud Infrastructure:</h3>
            <p className="text-sm mb-3">AWS (IaaS, PaaS, SaaS, CLI/API, VPS), Auto Scaling, EC2, EFS, Route 53, Amazon S3</p>
            
            <h3 className="font-semibold mb-2">Servers:</h3>
            <p className="text-sm mb-3">Apache HTTP Server, Load Balancing & Failover, MySQL, NFS, and Cron</p>
            
            <h3 className="font-semibold mb-2">Networking:</h3>
            <p className="text-sm mb-3">Nagios (Core, XI, Log Server, Fusion), Ping, Teletype Network, Netstat, Address Resolution Protocol</p>
            
            <h3 className="font-semibold mb-2">Containerization:</h3>
            <p className="text-sm mb-3">Swarm, CoreOS/rkt, Portainer, AWS ECR, Marathon, Hashicorp, Docker Swarm and Kubernetes</p>
          </div>
          
          <h2 className="text-xl font-bold text-blue-700 border-b border-gray-300 pb-1 mb-4">SOFT SKILLS</h2>
          <div className="grid grid-cols-2 gap-2 mb-6">
            <div className="bg-blue-50 text-sm p-2 rounded">Verbal & Written Communication</div>
            <div className="bg-blue-50 text-sm p-2 rounded">Flexibility</div>
            <div className="bg-blue-50 text-sm p-2 rounded">Time Management</div>
            <div className="bg-blue-50 text-sm p-2 rounded">Attention to detail</div>
          </div>
          
          <h2 className="text-xl font-bold text-blue-700 border-b border-gray-300 pb-1 mb-4">CERTIFICATIONS</h2>
          <div className="space-y-2 mb-6">
            <div className="text-sm">
              <div className="font-semibold">Microsoft Certified Solutions Developer</div>
            </div>
            <div className="text-sm">
              <div className="font-semibold">Google Cloud Certified – Associate Cloud Engineer</div>
            </div>
            <div className="text-sm">
              <div className="font-semibold">AWS Certification (Architecture and Development)</div>
            </div>
            <div className="text-sm">
              <div className="font-semibold">AWS Certified SysOps Admin - Associate</div>
            </div>
          </div>
          
          <h2 className="text-xl font-bold text-blue-700 border-b border-gray-300 pb-1 mb-4">ORGANIZATIONS</h2>
          <div className="space-y-1 text-sm">
            <div>Docker Community</div>
            <div>Association for DevOps Professionals (ADoP)</div>
            <div>Agile Alliance</div>
            <div>Cloud Native Computing Foundation (CNCF)</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DevOpsEngineerTemplate;