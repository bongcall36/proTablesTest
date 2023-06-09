import React from 'react';
import { ProForm, ProFormText } from '@ant-design/pro-components';

export const AntProForm = () => {

    return(
            <ProForm
                submitter={{
                    // Configure the button text
                    searchConfig: {
                    resetText: 'reset',
                    submitText: 'submit',
                    },
                    // Configure the properties of the button
                    resetButtonProps: {
                    style: {
                        // Hide the reset button
                        //display: 'none',
                        color: '#fff',
                        backgroundColor: '#1677ff',
                        boxShadow: '0 2px 0 rgba(5, 145, 255, 0.1)',
                        fontSize: '14px',
                        height: '32px',
                        padding: '4px 15px',
                        borderRadius: '6px'                    },
                    },
                    submitButtonProps: {},
                
                    // Fully customize the entire area
                    render: (props, doms) => {
                    //console.log(props);
                    return [
                        <button
                        type="button"                        
                        key="rest"
                        onClick={() => props.form?.resetFields()}
                        style={props.resetButtonProps.style}
                        >
                        <span>Reset</span>
                        </button>,
                        <button
                        type="button"                        
                        key="submit"
                        onClick={() => props.form?.submit?.()}
                        >                        
                        <span>Submit</span>
                        </button>,
                    ];
                    },
                }}
                onFinish={async (values) => {
                    console.log(values);
                }}
            >
              <ProFormText name="name" label="이름" placeholder="이름을 입력하세요"/>
            </ProForm>
    )     
}
