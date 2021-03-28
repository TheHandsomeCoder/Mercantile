import React from "react";
import { Header, Input, InputOnChangeData } from "semantic-ui-react";


interface EditableHeaderProps {
    value: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => void
}

export const EditableHeader: React.FC<EditableHeaderProps> = (props) => 
    <>
        <Header as="h2">
            <Input transparent fluid value={props.value} onChange={props.onChange}/>
        </Header> 
    </>

