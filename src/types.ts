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

export type Students = Student[]