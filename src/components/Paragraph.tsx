import React from 'react';
import {Message} from './Message';

export const Paragraph = ({ id }: { id: string }) => {
    return <p><Message id={id} /></p>;
};