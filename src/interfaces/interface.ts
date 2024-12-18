interface LeaveType {
  Casual: number;
  Sick: number;
  Paid: number;
}

interface LeaveApply {
  Days: number;
  LeaveType: string;
  onclick: (val: string) => void;
}

interface LeaveApplications {
    Id:number,
    StartDate:string,
    EndDate:string,
    LeaveType:string,
    Status:string,
    
}