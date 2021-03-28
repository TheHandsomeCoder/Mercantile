import React from "react";
import { Header, Input, InputProps } from "semantic-ui-react";


interface EditableHeaderProps {
    value: string,
    onChange: InputProps['onChange']
}

export const EditableHeader: React.FC<EditableHeaderProps> = (props) => 
    <>
        <Header as="h2">
            <Input transparent fluid value={props.value} onChange={props.onChange}/>
        </Header> 
    </>

