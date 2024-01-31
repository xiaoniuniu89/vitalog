import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  Row,
} from "@react-email/components";
import * as React from "react";
import { WeeklySummary } from "@prisma/client";

export function WeeklySummaryEmail(props: {
  user: { name: string };
  analysis: WeeklySummary;
}) {
  return (
    <Html>
      <Head />
      <Preview>Your weekly vita log analysis</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Row>
              <Img style={headerImage} width={340} src="hero-green.png" />
            </Row>
          </Section>

          <Section style={content}>
            Hi {props.user.name}, here is your weekly Vita Log analysis for{" "}
            {props.analysis.year} week {props.analysis.weekOfYear}.
            <Hr style={divider} />
            <Text style={paragraph}>{props.analysis.summary}</Text>
            <Hr style={divider} />
            <Heading as="h2" style={title}>
              Have you filled in your Vita Log today?
            </Heading>
            <Section style={buttonContainer}>
              <Link style={button} href="https://vitalog.co">
                Take me there!
              </Link>
            </Section>
            {/* <Heading as="h2" style={title}>
            Check out this weeks blog post
          </Heading>

          <Section style={buttonContainer}>
            <Link style={button} href="https://vitalog.co">
              Read on vita log
            </Link>
          </Section> */}
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#f3f3f5",
  fontFamily: "HelveticaNeue,Helvetica,Arial,sans-serif",
};

const headerImage = {
  width: "100%",
};

const title = {
  margin: "0 auto",
  fontWeight: "bold",
  fontSize: "21px",
  lineHeight: "21px",
  color: "#0c0d0e",
};

const paragraph = {
  fontSize: "15px",
  lineHeight: "21px",
  color: "#3c3f44",
};

const divider = {
  margin: "30px 0",
};

const container = {
  width: "680px",
  padding: "20px",
  maxWidth: "100%",
  display: "flex",
  margin: "0 auto",
  backgroundColor: "#ffffff",
};

const footer = {
  width: "680px",
  maxWidth: "100%",
  margin: "32px auto 0 auto",
  padding: "0 30px",
};

const content = {
  marginTop: "30px",
  padding: "30px 5px 40px 5px",
};

const logo = {
  display: "flex",
  background: "#f3f3f5",
  padding: "20px 30px",
};

const header = {
  maxWidth: "100%",
};

const buttonContainer = {
  alignItems: "center",
  justifyContent: "center",
  marginTop: "30px",
  display: "flex",
};

const button = {
  backgroundColor: "#0095ff",
  border: "1px solid #0077cc",
  fontSize: "17px",
  lineHeight: "17px",
  padding: "13px 17px",
  borderRadius: "4px",
  maxWidth: "120px",
  color: "#fff",
};

const footerDivider = {
  ...divider,
  borderColor: "#d6d8db",
};

const footerText = {
  fontSize: "12px",
  lineHeight: "15px",
  color: "#9199a1",
  margin: "0",
};

const footerLink = {
  display: "inline-block",
  color: "#9199a1",
  textDecoration: "underline",
  fontSize: "12px",
  marginRight: "10px",
  marginBottom: "0",
  marginTop: "8px",
};

const footerAddress = {
  margin: "4px 0",
  fontSize: "12px",
  lineHeight: "15px",
  color: "#9199a1",
};

const footerHeart = {
  borderRadius: "1px",
  border: "1px solid #d6d9dc",
  padding: "4px 6px 3px 6px",
  fontSize: "11px",
  lineHeight: "11px",
  fontFamily: "Consolas,monospace",
  color: "#e06c77",
  maxWidth: "min-content",
  margin: "0 0 32px 0",
};
