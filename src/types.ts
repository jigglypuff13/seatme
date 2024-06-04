export type SeatProps = {
  open: boolean,
  studentName: string,
  x: number,
  y: number
}

export type Student = {
  id: number,
  name: string,
  rules: any
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

// array of rule objects
// export type Rules = Rule[]

export type Students = Student[]