import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  border: 1px solid lightgrey;
  padding: 8px;
  borderr-adius: 2px;
  margin-bottom: 8px;
`

export default class Task extends React.Component {

  render() {

    return <Container>{this.props.task.content}</Container>
  }
}