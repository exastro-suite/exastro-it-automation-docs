#!/bin/bash
mkdir -p ~/.aws ~/.claude
which aws && {
    export AWS_CA_BUNDLE=/etc/pki/tls/certs/ca-bundle.crt
    aws sts get-caller-identity
}