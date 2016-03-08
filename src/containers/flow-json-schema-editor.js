import React, { Component } from 'react'
import JsonSchemaForm from 'react-jsonschema-form'
import request from 'superagent'

import { Message } from 'zooid-ui'
export default class FlowJsonSchemaEditor extends Component {

  componentDidMount() {
    var self = this
    request.get('http://localhost:3000/schemaRegistry.json', function(err, res){
      if (err) console.log(err)
      const parsedRes = JSON.parse(res.text)
      self.setState({schemaList: parsedRes})
    });
  }

  state = {
    nodeSchema: null,
    flowData: {},
    error: null,
    schemaList: null
  }

  handleSchemaFieldChange = ({ target }) => {
    const { value } = target
    const state = {}

    try {
      state.flowData = JSON.parse(value);
      state.error = null
    } catch(e) {
      this.error = e
    }

    this.setState(state, () => {
      const object = {}

      for (let i = 0; i < this.state.flowData.nodes.length; i++) {
        const schemaToLoad = this.state.flowData.nodes[i].class
        object[i] = this.state.schemaList[schemaToLoad]
      }

      const flowObject = { title: 'flowSchema', type: 'object', properties: object}
      this.setState({nodeSchema: flowObject})
    })
  }

  // handleNodeNumberFieldChange = ({ target }) => {
  //   const { value } = target
  //   const { flowData } = this.state
  //
  //   if (flowData) {
  //     this.setState({
  //       nodeNumber: value,
  //       nodeData: flowData.nodes[value]
  //     }, () => {
  //       if (this.state.nodeNumber) {
  //         const schemaType = this.state.flowData.nodes[value].class
  //         this.setState({nodeSchema: this.state.schemaList[schemaType], error: null})
  //       } else {
  //         this.setState({error: {message: 'No nodeNumber'}})
  //       }
  //     })
  //   }
  // }

  // handleSchemaChange = ({ formData }) => {
  //   this.setState({nodeData: formData}, () => {
  //     const { flowData, nodeNumber } = this.state
  //     const newFlowData = flowData
  //     newFlowData.nodes[nodeNumber] = formData
  //     this.setState({flowData: newFlowData})
  //   })
  // }

  render() {
    const { error, nodeSchema } = this.state

    let jsonSchemaForm = null
    if (nodeSchema && !error) {
      jsonSchemaForm = <JsonSchemaForm
        schema={nodeSchema}
        onChange={this.handleSchemaChange}/>
    }

    let errorMessage = null
    if (error) errorMessage = <Message type="error"><strong>Error:</strong> {error.message}</Message>

    return <div>
      {errorMessage}

      <h3>Flow Data</h3>
      <textarea
        rows='15'
        cols='100'
        name='flowData'
        onChange={this.handleSchemaFieldChange}
        value={JSON.stringify(this.state.flowData, null, '\t')}/>

      <h3>Schema Output</h3>
      {jsonSchemaForm}
    </div>
  }
}
