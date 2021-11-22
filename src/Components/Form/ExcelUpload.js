import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, FormText } from 'reactstrap';

import readXlsxFile from 'read-excel-file'


export default class ExcelUpload extends Component {

    getFileExtension(name) {
        const parts = name.split('.');

        if (parts.length > 0) {
            return parts.pop();
        }

        return false;
    }

    isValidExtension(name) {
        const extension = this.getFileExtension(name);
        return extension && extension.indexOf('xlsx') >= 0;
    }

    readFile(e) {
        const { target } = e;
        let file = null;

        if (target.files && target.files.length > 0) {
            file = target.files[0];
            if (!this.isValidExtension(file.name)) {
                return;
            }
        }

        this.proccessFile(file);
    }

    proccessFile(file) {
        readXlsxFile(file).then((rows) => {
            this.props.setRows(rows);
        });
    }

    render() {
        return (
            <Form className="col-12">
                <FormGroup>
                    <div className="dropzone" >
                        <Label for="file">Upload Your Excel file</Label>
                        <Input
                            style={{
                                height: '200px'
                            }}
                            type="file"
                            name="file"
                            id="file"
                            placeholder="Upload your excel file"
                            onChange={this.readFile.bind(this)}
                        />
                        <span id="txt">Or Drop Your File here </span>
                    </div>
                </FormGroup>
                <FormText color="muted">
                    It must be in *.xslx format
                </FormText>
            </Form>
        );
    }
}
