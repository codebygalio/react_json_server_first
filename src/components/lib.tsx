import React from 'react'
import { Button, Spin, Typography } from 'antd';
import styled from "@emotion/styled";

const FullPage = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const FullPageLoading = () => <FullPage>
 <Spin size={'large'}></Spin>  
</FullPage>

export const FullPageErrorFallback = ({error}:{error: Error|null}) => <FullPage>
  <Typography.Text type={'danger'}>{error?.message}</Typography.Text>
</FullPage>

export const ButtonNoPadding = styled(Button)`
padding: 0;
`
export const Row = styled.div<{
    gap?: number | boolean;
    between?: boolean;
    marginBottom?: number;
  }>`
    display: flex;
    align-items: center;
    justify-content: ${props => props.between ? 'space-between':undefined};
    margin-bottom: ${props => props.marginBottom + 'rem'};
    > * {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    margin-right: ${props => typeof props.gap === 'number'? props.gap + 'rem' : props.gap?'2rem' : undefined};
   }    
`

