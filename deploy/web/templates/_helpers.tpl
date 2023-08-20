{{/*
Expand the name of the chart.
*/}}
{{- define "gs-plomberie.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
If release name contains chart name it will be used as a full name.
*/}}
{{- define "gs-plomberie.fullname" -}}
{{- if .Values.fullnameOverride }}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- $name := default .Chart.Name .Values.nameOverride }}
{{- if contains $name .Release.Name }}
{{- .Release.Name | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" }}
{{- end }}
{{- end }}
{{- end }}

{{/*
Create chart name and version as used by the chart label.
*/}}
{{- define "gs-plomberie.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Common labels
*/}}
{{- define "gs-plomberie.labels" -}}
helm.sh/chart: {{ include "gs-plomberie.chart" . }}
{{ include "gs-plomberie.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{/*
Selector labels
*/}}
{{- define "gs-plomberie.selectorLabels" -}}
app.kubernetes.io/name: {{ include "gs-plomberie.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}

{{/*
Create the name of the service account to use
*/}}
{{- define "gs-plomberie.serviceAccountName" -}}
{{- if .Values.serviceAccount.create }}
{{- default (include "gs-plomberie.fullname" .) .Values.serviceAccount.name }}
{{- else }}
{{- default "default" .Values.serviceAccount.name }}
{{- end }}
{{- end }}

{{- define "env-vars" -}}
{{- range $key, $value := .Values.env.file }}
- name: {{ $key }}
  value: {{ $value }}
{{- end }}
{{- end }}     

{{- define "configmap-env-vars" -}}
{{- range $key, $val := .Values.env.configmap }}
- name: {{ $key }}
  valueFrom:
    configMapKeyRef:
      name: {{ $.Values.configMapName }}
      key: {{ $val }}
{{- end }}
{{- end }}
