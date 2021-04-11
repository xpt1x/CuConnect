export interface ElementMarks {
    element: string;
    obtained: string;
    total: string;
}

export interface SubjectMarks {
    name: string;
    marks: ReadonlyArray<ElementMarks>;
}

export interface Sessions {
    [key: string]: boolean;
}
  
  