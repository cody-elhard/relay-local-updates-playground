import _ from 'lodash';
import React, { useState } from 'react';
import { FormGroup, Modal, ModalBody, ModalHeader } from 'react-bootstrap';
import { commitLocalUpdate, useRelayEnvironment } from 'react-relay';

// Normally we would could infer the data response type from GraphQL query?
// interface Equipment {
//     _dataID: string;
//     name: string;
// }

const FormTesting = () => {
    const relayEnv = useRelayEnvironment();

    const [recordId, setRecordId] = useState('');
    const [_count, setCount] = useState(0);
    function triggerDepChange() {
        setCount(count => count + 1);
    }

    let record: any = {};
    if (recordId) {
      record = relayEnv.getStore().getSource().get(recordId) || {};
      console.log('read record', record);
    }

    return (
        <Modal show backdrop="static" size="lg" variant="primary">
            <Modal.Header>
                <Modal.Title>Form Testing</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormGroup>
                    <label htmlFor="name"> Name </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={record?.name || ''}
                        onChange={(e) => {
                            commitLocalUpdate(relayEnv, (store) => {
                                if (recordId === '') {
                                    const randomId = _.uniqueId('equipment_');
                                    const newRecord = store.create(randomId, 'equipment');
                                    console.log('new', newRecord);

                                    setRecordId(newRecord.getDataID().toString());
                                } else {
                                    const updateableRecord = store.get(recordId);
                                    updateableRecord?.setValue(e.target.value, 'name');
                                    triggerDepChange();
                                }
                            });
                        }}
                    />
                </FormGroup>
            </Modal.Body>
        </Modal>
    );
}

export default FormTesting;
