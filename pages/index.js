import styled from 'styled-components'
import Header from '../src/components/Header/Header'

const PageWrapper = styled.div`
  width: 100%;
  margin-top: calc(1.3cm + 4vh);
`

export default function Home() {
  return (
    <>
      <Header />
      <PageWrapper>
      </PageWrapper>
    </>
  )
}
