export interface Orgnization {
    id: string;
    URI: string;
    label: string;
    schema_definition: string;
    metadata: any;
    parent_id: string;
}

interface Cataloguer {
    name: string;
    lastname: string;
    email: string;
}

interface Classification {
    label: string;
    URI: string;
    id: string;
    parent_id: string;
    description: string;
}

interface ItemDescription {
    date: string;
    text: string;
    title: string;
    citation: string;
    interviewee: string;
    interviewer: string;
}

export interface InterviewPage {
    schema: string;
    schema_definition: string;
    swallow_id: string;
    create_date: string;
    last_modified: string;
    cataloguer: Cataloguer;
    classification: Classification[];
    Item_Description: ItemDescription;
}