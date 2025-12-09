==========
Glossary
==========
.. glossary::

    Movement
        This describes the smallest unit of work in ITA. A single Movement execution is the same as a single run of an Ansible Playbook.

    Operation
        The operation is associated with a target and parameters for the task to be performed.

    Parameter Sheet
        A data structure for managing system parameter information.

    Target Server
        The server on which Exastro IT Automation performs operations using Ansible.

    Workspace
        A work area for centralizing system configuration information and design information for automation tasks.

    Conductor
        A function for automating complex work flows by combining multiple automation tasks in ITA, such as workflows and job flows.

    Conductor Class
        A blueprint (template) for Conductor's automation flow. It defines and manages the flow from the start to the end of work, and the processing of each step (node).

    Node
        Individual steps (components) that make up a Conductor class. There are various types including start nodes, end nodes, execution nodes (Movement), and branch nodes.

    Conductor Work History (Conductor Instance)
        A function that manages the execution history of Conductor classes. It records the start time, end time, execution status, execution results, and error information for each execution instance.

    ConductorNode Instance (Node Instance)
        The execution entity of individual steps (nodes) generated when executing a Conductor class. It performs node status management, maintains execution results, and passes control flow to the next node during work execution.