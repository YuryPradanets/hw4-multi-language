import React from 'react';
import {Message} from './Message';

export const Button = ({ id }: { id: string }) => {
    return <button className='no_active_button'><Message id={id} />Пустая кнопка</button>;
};