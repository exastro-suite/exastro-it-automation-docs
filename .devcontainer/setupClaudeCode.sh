#!/bin/bash
which aws || {
    cd /tmp && curl -fsSL https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip -o awscliv2.zip \
      && unzip -q awscliv2.zip && sudo ./aws/install && rm -rf /tmp/aws /tmp/awscliv2.zip
}
[ -x "$HOME/.local/bin/claude" ] || curl -fsSL https://claude.ai/install.sh | bash