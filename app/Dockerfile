# Step 1: Use Maven and JDK 17 to build the app

FROM maven:3.9.9-eclipse-temurin-17 AS builder

WORKDIR /app

# Copy the pom for better caching
COPY pom.xml .

# Dependencies are downloaded especially libraries

RUN mvn dependency:go-offline -B

# Sourcecode is downloaded therafter
COPY src ./src

RUN mvn clean package -DskipTests

# Step 2: Use JRE 17 to run the app

FROM eclipse-temurin:17.0.15_6-jre

WORKDIR /app

COPY --from=builder /app/target/back-end-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
