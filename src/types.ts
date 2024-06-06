export type SeatProps = {
    open: boolean,
    studentName: string,
    x: number,
    y: number
}

export type Student = {
    id: number,
    name: string
}

// individual rule object = name of student
// key number = primary key 
// key: string = rule type
export type Rules = {
    [key:string]: string[]
}

/*
{
    'rule' : [
        'bobby', 'darren'
    ]
}
*/

export type Students = Student[]